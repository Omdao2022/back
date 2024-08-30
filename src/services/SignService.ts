import { generateNonce, SiweMessage } from "siwe";
import { GenerateAuthToken } from "../utils/generateAuthToken";

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

      const token = GenerateAuthToken(walletAddress);

      if(!token) console.log('error');
      
      return token;
    } catch {
      return false;
    }
  };
}
