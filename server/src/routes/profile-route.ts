import {ProfileController} from "../controllers/profile-controller";
import {Application} from "express";
import {AuthToken} from "../auth/auth-token";

export class ProfileRoute {
    PROFILE_BASE_URL = '/api/profile';

    public profileController: ProfileController = new ProfileController();

    public routes(app: Application, authToken: AuthToken) {
        // API URLs for profile
        app.route(`${this.PROFILE_BASE_URL}/:userId`).get(authToken.verifyToken, this.profileController.getProfile)
            .post(authToken.verifyToken, this.profileController.saveProfile)
            .put(authToken.verifyToken, this.profileController.updateProfile)
            .delete(authToken.verifyToken, this.profileController.deleteProfile);

        // API URLs for profile image
        app.route(`${this.PROFILE_BASE_URL}/photo/:userId`).put(authToken.verifyToken, this.profileController.updateProfileImage);
    }
}