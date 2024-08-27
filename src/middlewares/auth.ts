import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Client } from "../models/Client";
import devConfig from "../config/env";

const key = devConfig.secretkey;

interface AuthRequest extends Request {
  client?: any;
}

export default function (req: AuthRequest, res: Response, next: NextFunction) {
    
  const token = req.headers["x-auth-token"];

  if (!token || Array.isArray(token)) {
    return res.status(401).json({ msg: 'No token, authorization denied!' });
  }

  try {
    jwt.verify(token, key, async (error, decoded) => {
      if (error) {
        console.log(error);
        
        return res.status(401).json({ msg: "Token is not valid" });
      }
      
      if (decoded && typeof decoded === 'object' && decoded.walletAddress) {
        try {
          const client = await Client.findOne({walletAddress: decoded.walletAddress});

          if (!client) {
            return res.status(401).json({ msg: "Token is not valid" });
          }

          req.body.client = client;
          next();
        } catch (err) {
          console.error("Error fetching client:", err);
          return res.status(500).json({ msg: "Something went wrong with auth middleware" });
        }
      } else {
        return res.status(401).json({ msg: "Token is not valid" });
      }
    });
  } catch (err) {
    console.error("Something went wrong with auth middleware:", err);
    res.status(500).json({ msg: "Something went wrong with auth middleware" });
  }
}