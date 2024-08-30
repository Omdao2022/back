import jwt from 'jsonwebtoken';
import devConfig from '../config/env';

import { Client } from '../models/Client';

export const GenerateAuthToken = async (walletAddress: string) => {
  const client = await Client.findOne({ walletAddress });
  if (!client) {
    throw new Error('Client not found');
  }

  const payload = {
    walletAddress: client.walletAddress,
    firstName: client.firstName,
    lastName: client.lastName,
    birthday: client.email,
  };

  const key = devConfig.secretkey;

  return jwt.sign(payload, key, { expiresIn: 3600 });
};
