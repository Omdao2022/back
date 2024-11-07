import jwt from 'jsonwebtoken'
import devConfig from '../config/env'

import { Client } from '../models/Client'

export const GenerateAuthToken = async (walletAddress: string) => {
    const client = await Client.findOne({ walletAddress })
    if (!client) {
        return 'walletAddress does not exist!'
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
    const jwtToken = jwt.sign(payload, key, { expiresIn: 3600 })
    return jwtToken
}
