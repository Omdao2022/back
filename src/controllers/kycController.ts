import { Request, Response } from 'express'
import { KycService } from '../services/kycService'
import logger from '../utils/logger'
import jwt from 'jsonwebtoken'
import {
    getAccessToken,
    getApplicant,
    getApplicantVerifStep,
} from '../services/sumsubService'
import { SignService } from '../services/SignService'
import { GenerateAuthToken } from '../utils/generateAuthToken'
import { config } from 'dotenv'
config()

export class KycController {
    private kycService: KycService
    private signService: SignService

    constructor() {
        this.kycService = new KycService()
        this.signService = new SignService()
    }

    public registerClient = async (
        req: Request,
        res: Response
    ): Promise<void> => {
        logger.debug("client register request: ", req.body)
        const walletAddress = req.body.walletAddress

        try {
            if (!walletAddress) {
                res.status(401).json({
                    error: 'Unauthorized: No wallet address found',
                })
                return
            }

            try {
                const newUser = await this.kycService.createUser({
                    ...req.body,
                    walletAddress,
                })
                res.status(201).json(newUser)
            } catch (error) {
                logger.error('Error during registeration:', error)
                res.status(500).json({ error: 'Failed to create a user' })
            }
        } catch (error) {
            logger.error(
                'Error during registeration(wallet address extraction)',
                error
            )
            res.status(500).json({ error: 'failed to create new user' })
        }
    }

    public getAccessToken = async (
        req: Request,
        res: Response
    ): Promise<void> => {
        logger.debug('user body: ', req.body.client)
        const userId = req.body.client?.userId
        const token = await getAccessToken(userId)
        res.status(200).json(token)
    }

    public getApplicant = async (
        req: Request,
        res: Response
    ): Promise<void> => {
        const userId = req.params.userId
        const applicant = await getApplicant(userId)
        res.status(200).json(applicant)
    }

    public getApplicantVerifStep = async (
        req: Request,
        res: Response
    ): Promise<void> => {
        const userId = req.params.userId
        const verifStep = await getApplicantVerifStep(userId)
        res.status(200).json(verifStep)
    }

    public getNonce = async (req: Request, res: Response): Promise<void> => {
        logger.info('Get nonce request received');
        const address = req.params.address
        const nonce = await this.signService.getNonce()
        res.status(200).json({ nonce })
    }

    public verifySignature = async (
        req: Request,
        res: Response
    ): Promise<void> => {
        logger.debug(req.body)
        const { message, signature, walletAddress } = req.body

        const result = await this.signService.verifySignature(
            message,
            signature,
            walletAddress
        )

        if (!result) {
            res.status(401).json({ error: 'walletAddress does not exist!' })
        } else {
            res.status(200).json(result)
        }
    }

    public refreshToken = async (
        req: Request,
        res: Response
    ): Promise<void> => {
        const { refreshToken } = req.body
        if (!refreshToken) {
            res.status(401).json({ msg: 'Refresh token is required' })
            return
        }

        // Check if the refresh token exists in the database
        const storedToken = await refreshToken.findOne({ token: refreshToken })
        if (!storedToken) {
            res.status(403).json({ msg: 'Invalid refresh token' })
            return
        }
        // Generate new tokens
        const newTokens = await GenerateAuthToken(storedToken.walletAddress)
        res.status(200).json(newTokens)
    }

    public logout = async (req: Request, res: Response): Promise<void> => {
        const { refreshToken } = req.body
        if (!refreshToken) {
            res.status(401).json({ msg: 'Refresh token is required' })
            return
        }

        // Remove the refresh token from the database
        await refreshToken.deleteOne({ token: refreshToken })
        res.status(200).json({ msg: 'Logged out successfully' })
    }
}
