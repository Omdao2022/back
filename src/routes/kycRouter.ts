import { Router } from 'express';

import { KycController } from '../controllers/kycController';
import auth from '../middlewares/auth';

const kycRouter = Router();
const kycController = new KycController();

kycRouter.post('/register', kycController.registerClient);

kycRouter.get('/getToken/:userId', kycController.getAccessToken);

kycRouter.get('/getApplicant', kycController.getApplicant);

kycRouter.get('/getApplicantVerifStep', kycController.getApplicantVerifStep);

kycRouter.get('/getNonce', kycController.getNonce);

kycRouter.post('/verifySignature', kycController.verifySignature);

kycRouter.post('/testAuth', auth, (req, res)=> {
    res.json({success: true, a: req.body});
});

export default kycRouter;