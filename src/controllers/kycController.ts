import { Request, Response } from 'express';
import { KycService } from "../services/kycService";
import { getAccessToken, getApplicant, getApplicantVerifStep } from "../services/sumsubService";

export class KycController {
  private kycService: KycService;

  constructor() {
    this.kycService = new KycService();
  }

  async registerClient(req: Request, res: Response): Promise<void> {
    try {
      const newUser = await this.kycService.createUser(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: "Failed to create a user" });
    }
  }

  public getAccessToken = async (req: Request, res: Response): Promise<void> => {
    console.log(getAccessToken(1));
  }
} 