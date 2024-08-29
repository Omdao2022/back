import { Client } from "../models/Client";

export class KycService {

  public createUser = async (userData: any): Promise<any> => {
    try {
      const newUser = new Client(userData);
      const savedUser = await newUser.save();

      return savedUser;
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error creating user:", error.message);
        throw new Error(`Failed to create user: ${error.message}`);
      } else {
        console.error("Unexpected error creating user:", error);
        throw new Error("Failed to create user due to an unexpected error");
      }
    }
  };
}
