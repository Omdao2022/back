import { User } from "../models/Client";

export class KycService {
  public createUser = async (userData: any): Promise<any> => {
    console.log("UserData=======>", userData);
    const newUser = new User(userData);
    return await newUser.save();
  }
}
