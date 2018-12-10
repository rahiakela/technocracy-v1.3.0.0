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
    
}