import { Request, Response } from 'express';
import { KycService } from "../services/kycService";
import { getAccessToken, getApplicant, getApplicantVerifStep } from "../services/sumsubService";

export class KycController {
  private kycService: KycService;

  constructor() {
    this.kycService = new KycService();
  }

  public registerClient = async (req: Request, res: Response): Promise<void> => {
    try {
      console.log("req.body===========>", req.body);
      const newUser = await this.kycService.createUser(req.body);
      
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: "Failed to create a user" });
    }
  }

  public getAccessToken = async (req: Request, res: Response): Promise<void> => {
    const token = await getAccessToken("1");
    res.status(200).json(token);
  }

  public getApplicant = async (req: Request, res: Response): Promise<void> => {
    const applicant = await getApplicant("66b30afd74a2100f5992ac6f");
    res.status(200).json(applicant);
  }

  public getApplicantVerifStep = async (req: Request, res: Response): Promise<void> => {
    const verifStep = await getApplicantVerifStep("66b30afd74a2100f5992ac6f");
    res.status(200).json(verifStep);
  }
} 