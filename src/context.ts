import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

export const privateContext = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // TODO: for logged in users
  const token = req.cookies?.token;
  if (token) {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || ""
    ) as JwtPayload;
    req.ctx = {
      user: { userId: 1, username: decoded.username, email: decoded.email },
      req,
      token: decoded,
    };
    next();
  } else {
    res.status(401).send("UNAUTHORIZED");
  }
};

export const publicContext = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // TODO: for logged in users
  const token = req.cookies?.token;

  if (token) {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || ""
    ) as JwtPayload;

    req.ctx = {
      user: { userId: 1, username: decoded.username, email: decoded.email },
      req,
      token: decoded,
    };
    next();
  } else {
    next();
  }
};
