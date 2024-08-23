import { Router } from 'express';

import { KycController } from '../controllers/kycController';

const kycRouter = Router();
const kycController = new KycController();

kycRouter.post('/register', kycController.registerClient);

kycRouter.get('/getToken/:userId', kycController.getAccessToken);

kycRouter.get('/getApplicant', kycController.getApplicant);

kycRouter.get('/getApplicantVerifStep', kycController.getApplicantVerifStep);

kycRouter.get('/getNonce', kycController.getNonce);

kycRouter.post('/verifySignature', kycController.verifySignature);

export default kycRouter;