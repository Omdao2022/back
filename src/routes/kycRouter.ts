import { Router } from 'express';

import { KycController } from '../controllers/kycController';

const kycRouter = Router();
const kycController = new KycController();

kycRouter.post('/register', kycController.registerClient);

kycRouter.get('/getToken', kycController.getAccessToken);

kycRouter.get('/getApplicant', kycController.getApplicant);

kycRouter.get('/getApplicantVerifStep', kycController.getApplicantVerifStep);

export default kycRouter;