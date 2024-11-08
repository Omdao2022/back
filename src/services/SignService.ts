import { generateNonce, SiweMessage } from 'siwe'
import { GenerateAuthToken } from '../utils/generateAuthToken'
import logger from '../utils/logger'

export class SignService {
    public getNonce = async (): Promise<any> => {
        const nonce = generateNonce()
        return nonce
    }

    public verifySignature = async (
        message: string,
        signature: string,
        walletAddress: string
    ): Promise<{ accessToken: string; refreshToken: string } | boolean> => {
        const siweMessage = new SiweMessage(message)
        try {
            await siweMessage.verify({ signature })

            const tokens = GenerateAuthToken(walletAddress)

            if (!tokens) {
                logger.error('error with token generation')
                return false
            }

            return tokens
        } catch {
            logger.error('walletAddress does not exist!')
            return false
        }
    }
}
