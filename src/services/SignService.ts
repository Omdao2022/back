const Web3 = require("web3");
const { recoverPersonalSignature } = require("eth-sig-util");
const { bufferToHex } = require("ethereumjs-util");

interface NonceStore {
  [address: string]: number;
}

export class SignService {
  public nonceStore: NonceStore = {};

  public getNonce = async (address: string): Promise<any> => {
    const nonce = Math.floor(Math.random() * 1000000);
    this.nonceStore[address] = nonce;
    console.log("nonce=============>", this.nonceStore);
    return { "Nonce": nonce };
  };

  public verifySignature = async (
    address: string,
    signature: string
  ): Promise<any> => {
    const nonce = this.nonceStore[address];
    const message = `I am signing my one-time nonce: ${nonce}`;

    // Recover the address
    const msgBufferHex = bufferToHex(Buffer.from(message, "utf8"));
    const recoveredAddress = recoverPersonalSignature({
      data: msgBufferHex,
      sig: signature,
    });
    // Compare the recovered address to the provided address
    if (recoveredAddress.toLowerCase() === address.toLowerCase()) {
      return { success: true };
    } else {
      return { error: "Signature verification failed" };
    }
  };
}
