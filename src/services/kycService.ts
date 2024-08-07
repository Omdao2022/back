import { User } from "../models/Client";

export class KycService {
  async createUser(userData: any): Promise<any> {
    const newUser = new User(userData);
    return await newUser.save();
  }
}
