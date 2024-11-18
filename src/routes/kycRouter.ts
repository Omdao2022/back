import { Router } from 'express'

import { KycController } from '../controllers/kycController'
import auth from '../middlewares/auth'
import validateClient from '../validation/registerValidation'
import userIdValidator from '../validation/userIdValidator'
import verifySignatureValidator from '../validation/verifySignatureValidator'
import addressValidator from '../validation/addressValidator'

const kycRouter = Router()
const kycController = new KycController()

kycRouter.post('/register', validateClient, kycController.registerClient)

kycRouter.get('/getToken', auth, userIdValidator, kycController.getAccessToken)

kycRouter.get(
    '/getApplicant',
    auth,
    userIdValidator,
    kycController.getApplicant
)

kycRouter.get(
    '/getApplicantVerifStep',
    auth,
    userIdValidator,
    kycController.getApplicantVerifStep
)

kycRouter.get('/getNonce', kycController.getNonce)

kycRouter.post(
    '/verifySignature',
    verifySignatureValidator,
    kycController.verifySignature
)

kycRouter.post('/testAuth', auth, (req, res) => {
    res.json({ success: true, a: req.body })
})

kycRouter.post('/refreshToken', kycController.refreshToken)

export default kycRouter
