import { generateNonce, SiweMessage } from "siwe";

export class SignService {


  public getNonce = async (): Promise<any> => {
    const nonce = generateNonce();
    return { "Nonce": nonce };
  };

  public verifySignature = async (
    message: string,
    signature: string
  ): Promise<boolean> => {
    const siweMessage = new SiweMessage(message);
    try {
      await siweMessage.verify({ signature });
      return true;
    } catch {
      return false;
    }
  };
}
