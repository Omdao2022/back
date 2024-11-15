import mongoose, { Schema, model } from 'mongoose'

const refreshTokenSchema: Schema = new mongoose.Schema({
    token: { type: String, required: true },
    walletAddress: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: '8h' }, // Automatically remove after 30 days
})

export const RefreshToken = model('RefreshToken', refreshTokenSchema)
