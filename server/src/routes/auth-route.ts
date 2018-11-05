import {AuthController} from "../controllers/auth-controller";
import {Application} from "express";

export class AuthRoute {
    AUTH_BASE_URL = '/api/auth';

    public authController: AuthController = new AuthController();

    public routes(app: Application): void {
        // Auth API URLs for authentication
        app.route(`${this.AUTH_BASE_URL}/register`).post(this.authController.register);
        app.route(`${this.AUTH_BASE_URL}/login`).post(this.authController.login);
        app.route(`${this.AUTH_BASE_URL}/social/user`).post(this.authController.saveSocialUser);

        // Auth API URLs for account verification
        app.route(`${this.AUTH_BASE_URL}/activate/:token`).get(this.authController.activateAccount)
        app.route(`${this.AUTH_BASE_URL}/activate`).put(this.authController.updateEmail);
        app.route(`${this.AUTH_BASE_URL}/reactivate`).put(this.authController.reactivate);
        app.route(`${this.AUTH_BASE_URL}/forgot/pass`).put(this.authController.forgotPassword);
        app.route(`${this.AUTH_BASE_URL}/reset/pass`).put(this.authController.resetPassword);
    }
}