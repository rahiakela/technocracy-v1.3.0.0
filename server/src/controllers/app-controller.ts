import {NextFunction, Request, Response} from "express";
import {MailSender} from "../mail/mail.sender";
import {User} from "../models/user.model";

/**
 * @class AppController: Define common operation like user subscribed and unsubscribed etc.
 * @param req {Request} The express request object.
 * @param res {Response} The express response object.
 * @param next {NextFunction} The next function to continue.
 */
export class AppController {
    // mailSender: MailSender = new MailSender();

    /**
     * Update the user's subscription by saving "Y" and send subscription mail to the user.
     * @response: return json of updated user
     */
    public subscribe(req: Request, res: Response, next: NextFunction) {
        const email = req.params['email'];
        let found = false;

        //Respond with an error status if not all required fields are found
        if (!email) {
            this.validationError(res, next, 'email');
        }

        // search user in database against email id
        User.find({"local.email": email})
            .then((user: any) => {
                if (user.length > 0) {
                    found = true;
                    this.updateUserSubscription(user._id, email, "Y", res, next);
                }
            })
            .catch(next);

        if (!found) {
            User.find({"facebook.email": email})
                .then((user: any) => {
                    if (user.length > 0) {
                        found = true;
                        this.updateUserSubscription(user._id, email, "Y", res, next);
                    }
                })
                .catch(next);
        }

        if (!found) {
            User.find({"google.email": email})
                .then((user: any) => {
                    if (user.length > 0) {
                        found = true;
                        this.updateUserSubscription(user._id, email, "Y", res,next);
                    }
                })
                .catch(next);
        }

        if (!found) {
            User.find({"twitter.email": email})
                .then((user: any) => {
                    if (user.length > 0) {
                        found = true;
                        this.updateUserSubscription(user._id, email, "Y", res, next);
                    }
                })
                .catch(next);
        }

        if (!found) {
            User.find({"linkedin.email": email})
                .then((user: any) => {
                    if (user.length > 0) {
                        found = true;
                        this.updateUserSubscription(user._id, email, "Y", res,next);
                    }
                })
                .catch(next);
        }
    }

    /**
     * Update the user's subscription by saving "N" and don't send un-subscription mail to the user.
     * @response: return json of updated user
     */
    public unsubscribe(req: Request, res: Response, next: NextFunction) {
        const email = req.params['email'];
        let found = false;

        //Respond with an error status if not all required fields are found
        if (!email) {
            this.validationError(res, next, 'email');
        }

        // search user in database against mail id
        User.find({"local.email": email})
            .then((user: any) => {
                if (user.length > 0) {
                    found = true;
                    this.updateUserSubscription(user._id, email, "N", res, next);
                }
            })
            .catch(next);

        if (!found) {
            User.find({"facebook.email": email})
                .then((user: any) => {
                    if (user.length > 0) {
                        found = true;
                        this.updateUserSubscription(user._id, email, "N", res, next);
                    }
                })
                .catch(next);
        }

        if (!found) {
            User.find({"google.email": email})
                .then((user: any) => {
                    if (user.length > 0) {
                        found = true;
                        this.updateUserSubscription(user._id, email, "N", res, next);
                    }
                })
                .catch(next);
        }

        if (!found) {
            User.find({"twitter.email": email})
                .then((user: any) => {
                    if (user.length > 0) {
                        found = true;
                        this.updateUserSubscription(user._id, email, "N", res, next);
                    }
                })
                .catch(next);
        }

        if (!found) {
            User.find({"linkedin.email": email})
                .then((user: any) => {
                    if (user.length > 0) {
                        found = true;
                        this.updateUserSubscription(user._id, email, "N", res, next);
                    }
                })
                .catch(next);
        }
    }

    private updateUserSubscription(userId: string, email: string, valueToUpdate: string, res: Response, next: NextFunction) {

        //Update User to MongoDB
        User.update({"_id": userId}, {"subscription": valueToUpdate})
            .then((updatedUser: any) => {
                // send welcome subscription mail to user otherwise not
                if (valueToUpdate == "Y") {
                    const mailOptions = new Map<string, any>();
                    MailSender.sendMail("subscribed", mailOptions.set("recipient", email));
                }
                res.json({"statusCode": 200, "user": updatedUser});
                next();
            })
            .catch(next);
    }

    private validationError(res: Response, next: NextFunction, ...params: string[]) {
        res.json({
            statusCode: 400,
            message: `Fields ${params} must be required`,
        });
        next();
        return;
    }
}