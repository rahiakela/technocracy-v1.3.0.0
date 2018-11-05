import {NextFunction, Request, Response} from 'express';
const jwt = require("jsonwebtoken");

export class AuthToken {

    public verifyToken(req: Request, res: Response, next: NextFunction) {
        const token = req.headers["x-access-token"];

        if (!token) {
            res.status(401).send({auth: false, message: "No token provided."});
            return;
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                if (err instanceof jwt.TokenExpiredError) {
                    res.status(401).send({auth: false, message: "Authenticate token has expired."});
                } else if (err instanceof jwt.JsonWebTokenError) {
                    res.status(401).send({auth: false, message: "Failed to authenticate token."});
                } else {
                    res.status(401).send({auth: false, message: "Authenticate token is not valid."});
                }
                return;
            }

            // if everything good, then forward the request to actual routes
            next();
        });
    }
}