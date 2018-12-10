import {MailSender} from '../mail/mail.sender';
import {NextFunction, Request, Response} from 'express';
import * as crypto from 'crypto';
import {User} from '../models/user.model';
import {Subscription} from '../models/subscription.model';
import {DateTimeUtils} from '../utils/data-time-util';
import {UserUtils} from '../utils/user-utils';

/**
 * @class AuthController: Define authentication related operation like login, register and password reset etc.
 * @param req {Request} The express request object.
 * @param res {Response} The express response object.
 * @param next {NextFunction} The next function to continue.
 */
export class AuthController {

    private static updateUserSubscription(res, email, userId, valueToUpdate, next: NextFunction) {

        const mailOptions = new Map<string, any>();

        // Update UserModel to MongoDB
        User.findOneAndUpdate(
            {
                _id: userId, // query criteria
            },
            {    // data to update
                'subscription': valueToUpdate
            },
            {
                new: true, // options: return updated one
            }
        )
        .then((updatedUser) => {
            // send welcome subscription mail to user otherwise not
            if (valueToUpdate === 'Y') {
                MailSender.sendMail('subscribed', mailOptions.set('recipient', email));
            }
            res.json(updatedUser);
            next();
        })
        .catch(next);
    }

    private static updateUnRegisteredUserSubscription(req, res, email, valueToUpdate, next: NextFunction) {

        Subscription.find({'email': email})
            .then((subscription: any) => {
                if (subscription.length > 0) {
                    Subscription.findOneAndUpdate(
                        { _id: subscription[0]._id.toString() }, // query criteria
                        {
                            notification: valueToUpdate
                        }, // data to update
                        { new: true } // options: return updated one
                    )
                    .then(updatedSubscription => {
                        res.json(true);
                        next();
                    });
                } else {
                    const newSubscription = new Subscription();
                    const subscriptionToSave = {
                        email: email,
                        ipAddress: req.connection.remoteAddress,
                        notification: valueToUpdate
                    };
                    Object.assign(newSubscription, subscriptionToSave)
                        .save()
                        .then(savedSubscription => {
                            // send welcome subscription mail to user otherwise not
                            MailSender.sendMail('subscribed', new Map<string, any>().set('recipient', email));
                            res.json({'subscribed': true});
                            next();
                        });
                }
            })
            .catch(next);
    }

    private static validationError(res: Response, next: NextFunction, ...params: string[]) {
        res.json({
            statusCode: 400,
            message: `Fields ${params} must be required`,
        });
        next();
        return;
    }

    /**
     *  Login the user by verifying email and password if the user account is activated
     * @response: return json of user with JWT token by removing salt and hash
     */
    public login(req: Request, res: Response, next: NextFunction) {
        const email = req.body.email;
        const password = req.body.password;

        // Validate that required fields have been supplied
        if (!email && !password) {
            AuthController.validationError(res, next, 'email', 'password');
        }

        // find the user into database and verify password
        User.findOne({'local.email': email})
            .populate('profile')
            .then((user: any) => {

                if (user === null) {
                    res.status(401).send('The supplied email id is not available.');
                    return;
                }

                // if the user found then verify password
                // Call validPassword method, passing supplied password
                if (!user.validPassword(password, user)) {
                    res.status(401).send('The supplied password is not valid.');
                    return;
                }

                // check user account active or not
                if (user.local.active === 'N') {
                    // Otherwise return not active message
                    res.status(403).send('Account is not active,please verify email id.');
                    return;
                }

                // if password is valid and returned a user instance, then generate and send a JWT token
                const token = user.generateJWT(user._id, user.local.email, user.local.name);
                user.jwtToken = token;
                user.salt = '';
                user.hash = '';
                res.json({'statusCode': 200, 'user': user});
                next();
            })
            .catch(next);
    }

    /**
     * Register the user by saving into database and send mail activation code to verify mail id.
     * @response: return json of saved user
     */
    public register(req: Request, res: Response, next: NextFunction) {
        const mailId = req.body.email;
        const username = req.body.username;
        const password = req.body.password;

        const mailOptions = new Map<string, any>();
        const newUser = new User();

        // Respond with an error status if not all required fields are found
        if (!username || !mailId || !password) {
            AuthController.validationError(res, next, username, mailId, password);
        }

        User.findOne({'local.email': mailId})
            .then(user => {

                if (user != null) {
                    res.status(409).send('A account with this email id is already exists.');
                    return;
                }

                // set recipient mail id for email verification
                mailOptions.set('recipient', mailId);

                // generate password encryption
                const salt = crypto.randomBytes(16).toString('hex');  // Create a random string for salt
                const hash = crypto.pbkdf2Sync(password, salt, 100000, 512, 'sha512').toString('hex'); // Create encrypted hash

                // generate account activation token
                const activateToken = UserUtils.generateMailActivateToken();
                mailOptions.set('activateToken', activateToken);

                // Create a new user instance and set name and email
                const userToSave = {
                    'local': {
                        'name': username,
                        'email': mailId,
                        'activateToken': activateToken,
                        'createdOn': Date.now(),
                        'active': 'N'
                    },
                    'salt': salt,
                    'hash': hash
                };

                // Save new user to MongoDB
                Object.assign(newUser, userToSave)
                    .save()
                    .then((savedUser) => {
                        // send mail id verification code to user
                        MailSender.sendMail('activate-mail', mailOptions);
                        res.json(savedUser);
                        next();
                    });
            })
            .catch(next);
    }

    /**
     * Activate the user account by checking the expiry time of token and send welcome mail to the user.
     * @response: return json of updated user with JWT token otherwise respective message
     */
    public activateAccount(req: Request, res: Response, next: NextFunction) {

        const verifyToken = req.params['token'];

        // Respond with an error status if not all required fields are found
        if (!verifyToken) {
            AuthController.validationError(res, next, verifyToken);
        }

        const mailOptions = new Map<string, any>();

        User.findOne({'local.activateToken.token' : verifyToken})
            .then((user: any) => {

                if (user === null) {
                    res.status(422).send('The account activation code is not available.');
                    return;
                }
                if (user.local.active === 'Y') {
                    res.status(422).send('The account is already activated.');
                    return;
                }

                // if user found then check its expiry time
                const expires = new Date(user.local.activateToken.expires);
                const expiredHours = DateTimeUtils.getExpiredTime(new Date(Date.now()), expires);
                // expiry time must be within 24 hours
                if (expiredHours > 24) {
                    res.status(403).send('The account activation code has been expired.');
                    return;
                }

                // update user instance
                User.findOneAndUpdate(
                        {  // query criteria
                            _id: user._id
                        },
                        {  // data to update
                            'local.active': 'Y',
                            'local.activatedOn': Date.now()
                        },
                        {
                            new: true, // options: return updated one
                        }
                    )
                    .then((updatedUser: any) => {
                        // if user instance saved then generate and send a JWT token
                        updatedUser.jwtToken = user.generateJWT(user._id, user.local.email, user.local.name);
                        // return the user after removing salt, hash
                        updatedUser.salt = '';
                        updatedUser.hash = '';
                        // send welcome mail to user
                        MailSender.sendMail('welcome-mail', mailOptions.set('recipient', user.local.email));
                        res.json({'statusCode': 200, 'user': updatedUser});
                        next();
                    })
                    .catch(next);
            })
            .catch(next);
    }

    /**
     * Resend the activation code to the user for verify mail id again.
     * @response: return json of status message
     */
    public reactivate(req: Request, res: Response, next: NextFunction) {
        const mailId = req.body.email;
        const mailOptions = new Map<string, any>();

        // Respond with an error status if not all required fields are found
        if (!mailId) {
            AuthController.validationError(res, next, mailId);
        }

        User.findOne({'local.email': mailId})
            .then((user) => {
                const verifyToken = UserUtils.generateMailActivateToken();
                mailOptions.set('activateToken', verifyToken);

                // update user instance
                User.findOneAndUpdate(
                    {  // query criteria
                        _id: user._id
                    },
                    {  // data to update
                        'local.activateToken': verifyToken
                    },
                    {
                        new: true, // options: return updated one
                    }
                )
                    .then((updatedUser) => {
                        // send mail id verification mail to user
                        MailSender.sendMail('activate-mail', mailOptions.set('recipient', mailId));
                        res.json({'statusCode': 200, 'verified': true});
                        next();
                    })
                    .catch(next);
            })
            .catch(next);
    }

    /**
     * Update the mail id of user by replacing old mail id and send activation code to the user for verify mail id again.
     * @response: return json of status message
     */
    public updateEmail(req: Request, res: Response, next: NextFunction) {
        const newMailId = req.body.newEmail;
        const oldMailId = req.body.oldEmail;
        const mailOptions = new Map<string, any>();

        // Respond with an error status if not all required fields are found
        if (!newMailId && !oldMailId) {
            AuthController.validationError(res, next, newMailId, oldMailId);
        }

        User.findOne({'local.email' : oldMailId})
            .then((user) => {
                if (user) { // if user found then update old mail id with new one
                    const verifyToken = UserUtils.generateMailActivateToken();
                    mailOptions.set('activateToken', verifyToken);

                    // update user instance
                    User.findOneAndUpdate(
                        {  // query criteria
                            _id: user._id
                        },
                        {  // data to update
                            'local.email': newMailId,
                            'local.activateToken': verifyToken
                        },
                        {
                            new: true, // options: return updated one
                        }
                    )
                        .then((updatedUser) => {
                            // send mail id verification code to user
                            MailSender.sendMail('activate-mail', mailOptions.set('recipient', newMailId));
                            res.json({'statusCode': 200, 'updated': true});
                            next();
                        })
                        .catch(next);
                }
            })
            .catch(next);
    }

    /**
     * Send the password reset code to the user mail account.
     * @response: return json of status message
     */
    public forgotPassword(req: Request, res: Response, next: NextFunction) {
        const email = req.body.email;
        const mailOptions = new Map<string, any>();

        // Respond with an error status if not all required fields are found
        if (!email) {
            AuthController.validationError(res, next, email);
        }

        User.findOne({'local.email': email})
            .then((user) => {

                if (user === null) {
                    res.status(422).send('The specified email address is not available.');
                    return;
                }

                mailOptions.set('recipient', email);
                const verifyToken = UserUtils.generateMailActivateToken();
                mailOptions.set('activateToken', verifyToken);

                // update user instance
                User.findOneAndUpdate(
                        {  // query criteria
                            _id: user._id
                        },
                        {  // data to update
                            'local.activateToken': verifyToken
                        },
                        {
                            new: true, // options: return updated one
                        }
                    )
                    .then((updatedUser: any) => {
                        mailOptions.set('username', updatedUser.local.name);
                        // send mail id verification mail to user
                        MailSender.sendMail('password-reset-mail', mailOptions.set('recipient', email));
                        res.json({'statusCode': 200, 'user': updatedUser, 'mailSent': true});
                        next();
                    })
                    .catch(next);

            })
            .catch(next);
    }

    /**
     * Reset the user account password using token.
     * @response: return json of status message
     */
    public resetPassword(req: Request, res: Response, next: NextFunction) {

        const password = req.body.password;
        const token = req.body.token;

        // Respond with an error status if not all required fields are found
        if (!token) {
            AuthController.validationError(res, next, token);
        }

        const mailOptions = new Map<string, any>();

        User.findOne({'local.activateToken.token' : token})
            .then((user: any) => {

                if (user === null) {
                    res.status(422).send('The given password reset code is not available.');
                    return;
                }

                // if user found then check the token expiry time
                const expires = new Date(user.local.activateToken.expires);
                const expiredHours = DateTimeUtils.getExpiredTime(new Date(Date.now()), expires);
                // expiry time must be within 24 hours
                if (expiredHours > 24) {
                    res.status(403).send('The password reset code has been expired.');
                    return;
                }

                // generate password encryption
                const salt = crypto.randomBytes(16).toString('hex');  // Create a random string for salt
                const hash = crypto.pbkdf2Sync(password, salt, 100000, 512, 'sha512').toString('hex'); // Create encrypted hash

                // update user instance
                User.findOneAndUpdate(
                        {  // query criteria
                            _id: user._id
                        },
                        {  // data to update
                            'salt': salt,
                            'hash': hash
                        },
                        {
                            new: true, // options: return updated one
                        }
                    )
                    .then((updatedUser: any) => {
                        res.json({'statusCode': 200, 'resetPass': true});
                        next();
                    })
                    .catch(next);
            })
            .catch(next);
    }

    /**
     *  Save/Update the user information if they login with social networking account like Google, Facebook and Twitter etc.
     * @response: return json of saved or updated user with JWT token
     */
    public saveSocialUser(req: Request, res: Response, next: NextFunction) {

        const provider = req.body.provider;
        const email = req.body.email;
        const name = req.body.name;
        const image = req.body.image;
        const token = req.body.token;
        const uid = req.body.uid;

        const userToUpdate = new User();
        const mailOptions = new Map<string, any>();

        // Validate that required fields have been supplied
        if (!email || !name || !uid) {
            AuthController.validationError(res, next, 'email', 'name', 'uid');
        }

        if (provider === 'FACEBOOK') {
            User.findOne({'facebook.uid' : uid})
                .then((user: any) => {

                    if (user) { // if user found then return this user
                        // generate and send a JWT token
                        const generateToken = user.generateJWT(user._id, user.facebook.email, user.facebook.name);
                        user.jwtToken = generateToken;
                        res.json(user);
                    } else { // if not found then create new facebook user
                        // Create a new facebook user instance and set its properties
                        const userInfoToUpdate = {
                            'facebook': {
                                'name': name,
                                'email': email,
                                'uid': uid,
                                'image': image,
                                'token': token,
                                'lastLogin': Date.now(),
                                'createdOn': Date.now()
                            }
                        };

                        // Save this facebook user to MongoDB
                        Object.assign(userToUpdate, userInfoToUpdate)
                            .save()
                            .then((updatedUser: any) => {
                                // generate and send a JWT token
                                const generateToken = updatedUser.generateJWT(updatedUser._id, email, name);
                                // send welcome mail to user
                                MailSender.sendMail('welcome-mail', mailOptions.set('recipient', email));
                                updatedUser.jwtToken = generateToken;
                                res.json(updatedUser);
                                next();
                            })
                            .catch(next);
                    }
                })
                .catch(next);
        }

        if (provider === 'GOOGLE') {

            User.findOne({'google.uid' : uid})
                .then((user: any) => {
                    if (user) { // if user found then return this user
                        // generate and send a JWT token
                        const generateToken = user.generateJWT(user._id, user.google.email, user.google.name);
                        user.jwtToken = generateToken;
                        res.json(user);
                    } else { // if not found then create new google user
                        // Create a new google user instance and set its properties
                        const userInfoToUpdate = {
                            'google': {
                                'name': name,
                                'email': email,
                                'uid': uid,
                                'image': image,
                                'token': token,
                                'lastLogin': Date.now(),
                                'createdOn': Date.now()
                            }
                        };

                        // Save this google user to MongoDB
                        Object.assign(userToUpdate, userInfoToUpdate)
                            .save()
                            .then((updatedUser: any) => {
                                // generate and send a JWT token
                                const generateToken = updatedUser.generateJWT(updatedUser._id, email, name);
                                // send welcome mail to user
                                MailSender.sendMail('welcome-mail', mailOptions.set('recipient', email));
                                updatedUser.jwtToken = generateToken;
                                res.json(updatedUser);
                                next();
                            })
                            .catch(next);
                    }
                })
                .catch(next);
        }

        if (provider === 'LINKEDIN') {

            User.findOne({'linkedin.uid' : uid})
                .then((user: any) => {
                    if (user) { // if user found then return this user
                        // generate and send a JWT token
                        const generateToken = user.generateJWT(user._id, user.linkedin.email, user.linkedin.name);
                        user.jwtToken = token;
                        res.json(user);
                    } else { // if not found then create new linkedin user
                        // Create a new linkedin user instance and set its properties
                        const userInfoToUpdate = {
                            'linkedin': {
                                'name': name,
                                'email': email,
                                'uid': uid,
                                'image': image,
                                'token': token,
                                'lastLogin': Date.now(),
                                'createdOn': Date.now()
                            }
                        };

                        // Save this linkedin user to MongoDB
                        Object.assign(userToUpdate, userInfoToUpdate)
                            .save()
                            .then((updatedUser: any) => {
                                // generate and send a JWT token
                                const generateToken = updatedUser.generateJWT(updatedUser._id, email, name);
                                // send welcome mail to user
                                MailSender.sendMail('welcome-mail', mailOptions.set('recipient', email));
                                updatedUser.jwtToken = generateToken;
                                res.json(updatedUser);
                                next();
                            })
                            .catch(next);
                    }
                })
                .catch(next);
        }
    }

    /**
    *  Save/Update the user subscription information if they are already registered
    *  otherwise add his subscription information in subscription document.
    * @response: return json of saved or updated user
    */
    public subscribe(req: Request, res: Response, next: NextFunction) {
      const email = req.body.email;

      // Validate that required fields have been supplied
      if (!email ) {
        AuthController.validationError(res, next, 'email');
      }

      // search user in database against mail id
      User.find({'local.email': email})
        .then((localUser: any) => { // search user using email in local sub document
          if (localUser.length > 0) {
            AuthController.updateUserSubscription(res, email, localUser[0]._id.toString(), 'Y', next);
          } else {
            // search user using email in facebook sub document
            User.find({'facebook.email': email})
              .then((fbUser: any) => {
                if (fbUser.length > 0) {
                  AuthController.updateUserSubscription(res, email, fbUser[0]._id.toString(), 'Y', next);
                } else {
                  // search user using email in google sub document
                  User.find({'google.email': email})
                    .then((googleUser: any) => {
                      if (googleUser.length > 0) {
                        AuthController.updateUserSubscription(res, email, googleUser[0]._id.toString(), 'Y', next);
                      } else { // otherwise save un-registered user subscription
                        AuthController.updateUnRegisteredUserSubscription(req, res, email, 'Y', next);
                      }
                    });
                }
              });
          }
        })
        .catch(next);

    }

    /**
     *  Update the user un-subscription information if they are already registered
     *  otherwise update his un-subscription information in subscription document.
     * @response: return json of saved or updated user
     */
    public unsubscribe(req: Request, res: Response, next: NextFunction) {
      const email = req.body.email;

      // Validate that required fields have been supplied
      if (!email ) {
        AuthController.validationError(res, next, 'email');
      }

      // search user in database against mail id
      User.find({'local.email': email})
        .then((localUser: any) => { // search user using email in local sub document
          if (localUser.length > 0) {
            AuthController.updateUserSubscription(res, email, localUser[0]._id, 'N', next);
          } else {
            // search user using email in facebook sub document
            User.find({'facebook.email': email})
              .then((fbUser: any) => {
                if (fbUser.length > 0) {
                  AuthController.updateUserSubscription(res, email, fbUser[0]._id, 'N', next);
                } else {
                  // search user using email in google sub document
                  User.find({'google.email': email})
                    .then((googleUser: any) => {
                      if (googleUser.length > 0) {
                        AuthController.updateUserSubscription(res, email, googleUser[0]._id, 'N', next);
                      } else { // otherwise save un-registered user subscription
                        AuthController.updateUnRegisteredUserSubscription(req, res, email, 'N', next);
                      }
                    });
                }
              });
          }
        })
        .catch(next);
    }

    private getUserDetailsFromRequest(req: Request): any {
        let user;
        if (req.body.provider === 'FACEBOOK') {
            user = {
                'provider': req.body.provider,
                'email': req.body.email,
                'name': req.body.name,
                'firstName': req.body.firstName,
                'lastName': req.body.lastName,
                'image': req.body.image,
                'token': req.body.token,
                'uid': req.body.uid
            };
        }
        if (req.body.google) {
            user = {
                'provider': req.body.google.provider,
                'email': req.body.google.email,
                'name': req.body.google.name,
                'uid': req.body.google.uid,
                'image': req.body.google.image,
                'token': req.body.google.token
            };
        }
        if (req.body.linkedin) {
            user = {
                'provider': req.body.linkedin.provider,
                'email': req.body.linkedin.email,
                'name': req.body.linkedin.name,
                'uid': req.body.linkedin.uid,
                'image': req.body.linkedin.image,
                'token': req.body.linkedin.token
            };
        }

        return user;
    }
}
