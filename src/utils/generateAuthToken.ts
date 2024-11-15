import jwt from 'jsonwebtoken'
import devConfig from '../config/env'
import logger from '../utils/logger'
import { Client } from '../models/Client'
import { RefreshToken } from '../models/RefreshToken'

export const GenerateAuthToken = async (walletAddress: string) => {
    const client = await Client.findOne({ walletAddress })
    if (!client) {
        logger.error('walletAddress does not exist!')
        return false
    }

    const payload = {
        walletAddress: client.walletAddress,
        firstName: client.firstName,
        lastName: client.lastName,
        birthday: client.birthday,
        email: client.email,
        country: client.country,
        location: client.location,
        address: client.address,
        zipcode: client.zipcode,
    }

    const key = devConfig.secretkey
    const accessToken = jwt.sign(payload, key, { expiresIn: '15m' })
    const refreshToken = jwt.sign(payload, key, { expiresIn: '8h' })
    await RefreshToken.create({
        token: refreshToken,
        walletAddress: client.walletAddress,
    })
    return { accessToken, refreshToken }
}

export const RefreshAuthToken = async (refreshToken: string) => {
    try {
        const key = devConfig.secretkey
        const decoded = jwt.verify(refreshToken, key)
        const newAccessToken = jwt.sign(decoded, key, { expiresIn: '15m' })
        return newAccessToken
    } catch (error) {
        return 'Invalid refresh token'
    }
}
