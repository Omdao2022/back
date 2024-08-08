import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

export default {
  sumsubToken: process.env.SUMSUB_TOKEN,
  sumsubSecret: process.env.SUMSUB_SECRET,
};