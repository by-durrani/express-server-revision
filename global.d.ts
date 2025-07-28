import { Request } from "express";
import type { JwtPayload } from "jsonwebtoken";

export {};

declare global {
  namespace Express {
    interface Request {
      ctx?: {
        user: {
          userId: number;
          username: string;
          email: string;
        };
        req: Request;
        token?: string | JwtPayload;
      };
    }
  }
  var PORT: number;
}
