import crypto from 'crypto';

const sumsubSecretString: String | undefined = process.env.SUMSUB_SECRET;
console.log("sumsubSecretString=====>", sumsubSecretString);
const sumsubSecret = Buffer.from(sumsubSecretString ?? '', 'utf-8');

export { sumsubSecret };