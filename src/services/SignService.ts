import { generateNonce, SiweMessage } from "siwe";
import jwt from "jsonwebtoken";
import devConfig from "../config/env";

import { Client } from "../models/Client";

export class SignService {


  public getNonce = async (): Promise<any> => {
    const nonce = generateNonce();
    return nonce;
  };

  public verifySignature = async (
    message: string,
    signature: string,
    walletAddress: string
  ): Promise<string | boolean> => {
    const siweMessage = new SiweMessage(message);
    try {
      await siweMessage.verify({ signature });

      const client = await Client.findOne({ walletAddress });
      if (!client) {
        throw new Error('Client not found');
      };
      const payload = {
        walletAddress: client.walletAddress,
        firstName: client.firstName,
        lastName: client.lastName,
        birthday: client.email
      };
      const key = devConfig.secretkey;

      const token = jwt.sign(payload, key, { expiresIn: 3600 });

      if(!token) console.log('error');
      
      return token;
    } catch {
      return false;
    }
  };
}
