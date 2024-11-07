// String validator
import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'

const schema = Joi.object({
    address: Joi.string().min(1).required().messages({
        'string.base': 'Address must be a string',
        'string.empty': 'Address cannot be empty',
        'any.required': 'Address field is required',
    }),
})

const addressValidator = (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.params)

    if (error) {
        return res
            .status(400)
            .json({ errors: error.details.map((err) => err.message) })
    }

    next()
}

export default addressValidator
