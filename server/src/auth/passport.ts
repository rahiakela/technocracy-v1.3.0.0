import {User} from '../models/user.model';
const passport=require("passport");
const LocalStrategy=require("passport-local").Strategy;

/**
 * Local authentication strategy
 * Sign in using Email and Password.
 */
passport.use(new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    User.findOne({ "local.email": email.toLowerCase() }, (err, user: any) => {
        if(err)
            return done(err);
        //If no user is found,return false and a message
        if(!user){
            return done(null,false,{
                message:"Incorrect username."
            });
        }

        //Call validPassword method, passing supplied password
        if(!user.validPassword(password, user)){
            //If password is incorrect, return false and a message
            return done(null,false,{
                message:"Incorrect password."
            });
        }

        //If we’ve got to the end we can return user object
        return done(null, user);
    });
}));


