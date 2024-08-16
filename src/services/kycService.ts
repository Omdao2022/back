import { Client } from "../models/Client";

export class KycService {
  public createUser = async (userData: any): Promise<any> => {
    console.log("UserData=======>", userData);
    const newUser = new Client(userData);
    return await newUser.save();
  }
}
