import conf from '../conf/conf.js'
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    // when a object is created then only client should be created.
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const uniqueID = ID.unique();
            console.log("Uniqe ID generated in auth.js: ", uniqueID);

            const userAccount = await this.account.create(uniqueID, email, password, name);
            
            if (userAccount) {
                return this.login({ email, password });
            } else {
                console.log("In auth.js, userAccount not created so return userAccount");
                return userAccount;
            }
        } catch (error) {
            console.log("auth.js, error in creating account");
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            // returns a session object.
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.log("auth.js, error in logging account");
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            // get the currently logged in user.
            console.log("auth.js, entered getCurrentUser success");
            return await this.account.get();
        } catch (error) {
            console.log("auth.js, getCurrentUser error", error);
        }
        return null;
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("auth.js, logout::error", error);
        }
    }
}

// exporting object - authService of class - AuthService
const authService = new AuthService();
export default authService