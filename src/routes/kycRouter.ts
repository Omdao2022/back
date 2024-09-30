import { Router } from 'express';

import { KycController } from '../controllers/kycController';
import auth from '../middlewares/auth';
import validateClient from '../validation/registerValidation';
import userIdValidator from '../validation/userIdValidator';
import verifySignatureValidator from '../validation/verifySignatureValidator';
import addressValidator from '../validation/addressValidator';

const kycRouter = Router();
const kycController = new KycController();

kycRouter.post('/register',  validateClient, kycController.registerClient);

kycRouter.get('/getToken/:userId', auth, userIdValidator, kycController.getAccessToken);

kycRouter.get('/getApplicant', auth, userIdValidator, kycController.getApplicant);

kycRouter.get('/getApplicantVerifStep', auth, userIdValidator, kycController.getApplicantVerifStep);

kycRouter.get('/getNonce', auth, addressValidator, kycController.getNonce);

kycRouter.post('/verifySignature', verifySignatureValidator, kycController.verifySignature);

kycRouter.post('/testAuth', auth, (req, res)=> {
    res.json({success: true, a: req.body});
});

export default kycRouter;