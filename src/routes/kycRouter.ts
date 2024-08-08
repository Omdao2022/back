import { Router } from 'express';

import { KycController } from '../controllers/kycController';

const kycRouter = Router();
const kycController = new KycController();

kycRouter.post('/kyc', kycController.registerClient);

kycRouter.get('/getToken', kycController.getAccessToken);


export default kycRouter;