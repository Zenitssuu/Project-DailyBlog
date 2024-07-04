import config from "../config/config.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({email, password,name}){
    // eslint-disable-next-line no-useless-catch
    try {
        const userAcc = await this.account.create(ID.unique(), email,password,name);

        if(userAcc){
            // call another method : login
            return this.login({email,password});
        }
        else{
            return userAcc;
        }
    } catch (error) {
        throw error;
    }
  }

  async login({email,password}){
    try {
        const user = await this.account.createEmailPasswordSession(email,password);
        return user;
    } catch (error) {
        console.log('user not found: ',error);
        return null;        
    }
  }

  async getCurrUser(){
    try {
        return await this.account.get(); //get the currently logged in user
    } catch (error) {
        console.log("appwrite service :: getCurrentUser :: error ",error);
        return null;
    }
    // eslint-disable-next-line no-unreachable
    return null;
  }

  async logout(){
    try {
        await this.account.deleteSessions();
    } catch (error) {
        console.log("logout error: ",error);
        return;        
    }
  }
}

const authservice = new AuthService();

export default authservice;
