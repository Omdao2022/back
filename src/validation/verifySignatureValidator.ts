// String validator
import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

interface Validation {
    walletAddress: string;
    message: string;
    signature: string;
}
const schema = Joi.object<Validation>({
  walletAddress: Joi.string().min(1).required().messages({
    'string.base': 'Wallet Address must be a string',
    'string.empty': 'Wallet Address cannot be empty',
    'any.required': 'Wallet Address field is required',
  }),
  message: Joi.string().min(1).required().messages({
    'string.base': 'Message must be a string',
    'string.empty': 'Message cannot be empty',
    'any.required': 'Message field is required',
  }),
  signature: Joi.string().min(1).required().messages({
    'string.base': 'Signature must be a string',
    'string.empty': 'Signature cannot be empty',
    'any.required': 'Signature field is required',
  }),

});

const verifySignatureValidator = ( req: Request,  res: Response,  next: NextFunction, ) => {
  console.log(req.body);

  const { error } = schema.validate(req.body);

  if (error) {
    return res
      .status(400)
      .json({ errors: error.details.map((err) => err.message) });
  }

  next();
};

export default verifySignatureValidator;
