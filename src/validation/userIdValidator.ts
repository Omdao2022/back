// String validator
import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const schema = Joi.object({
    userId: Joi.string()
        .min(1)
        .required()
        .messages({
            'string.base': 'User Id must be a string',
            'string.empty': 'User Id cannot be empty',
            'any.required': 'User Id field is required',
        }),
});

const userIdValidator = (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.params);
    
    if (error) {
        return res.status(400).json({ errors: error.details.map(err => err.message) });
    }
    
    next();
};

export default userIdValidator;