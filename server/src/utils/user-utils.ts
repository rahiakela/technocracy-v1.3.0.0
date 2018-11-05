import {User} from "../domains/user";

export class UserUtils {

    /**
     * Decode the encoded blog's content text
     * @param text {string} The encoded blog's content.
     * @response: return decoded string of blog's content
     */
    public static decodeHTML(text: string): string {
        return text.replace(/&#(\d+);/g, (dec: any) => {
            return String.fromCharCode(dec);
        });
    }

    /**
     * Get the user name from the user object
     * @param user {User} The user object.
     * @response: return the user name
     */
    public static getUserName(user: User): string {
        let username = '';

        if (user.local.name !== undefined) {
            username = user.local.name;
        }
        if (user.facebook.name !== undefined) {
            username = user.facebook.name;
        }
        if (user.google.name !== undefined) {
            username = user.google.name;
        }
        if (user.linkedin.name !== undefined) {
            username = user.linkedin.name;
        }

        return username;
    }

    /**
     * Get the user email id from the user object
     * @param user {User} The user object.
     * @response: return the user email id
     */
    public static getUserEmail(user: User): string {
        let email = '';

        if (user.local.email !== undefined) {
            email = user.local.email;
        }
        if (user.facebook.email !== undefined) {
            email = user.facebook.email;
        }
        if (user.google.email !== undefined) {
            email = user.google.email;
        }
        if (user.linkedin.email !== undefined) {
            email = user.linkedin.email;
        }

        return email;
    }

    /**
     * Generate the email activation code for email verification
     * @response: return the generated token
     */
    public static generateMailActivateToken(): any {
        // create random 16 character token
        let chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let token = "";
        for (let i = 16; i > 0; --i) {
            token += chars[Math.round(Math.random() * (chars.length - 1))];
        }

        // create expiration date
        let expires = new Date();
        expires.setHours(expires.getHours() + 24); // set 24 hours token expiry time

        return {
            "token": token,
            "expires": expires
        };
    }
}