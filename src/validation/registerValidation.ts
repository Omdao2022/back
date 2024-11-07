import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'

interface Client {
    firstName: string
    lastName: string
    birthday: Date
    email: string
    country: object
    location: string
    address: string
    zipcode: string
    kycPassed?: boolean
    walletAddress: string
}

const clientValidationSchema = Joi.object<Client>({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    birthday: Joi.date().required(),
    email: Joi.string().email().required(),
    country: Joi.object().required(),
    location: Joi.string().required(),
    address: Joi.string().required(),
    zipcode: Joi.string().required(),
    walletAddress: Joi.string().required(),
})

const validateClient = (req: Request, res: Response, next: NextFunction) => {
    const { error } = clientValidationSchema.validate(req.body)

    if (error) {
        return res.status(400).json({ error: error.details[0].message })
    }

    next()
}

export default validateClient
