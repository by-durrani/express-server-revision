import { Router } from "express";
import path from "node:path";
import crypto from "node:crypto";
import jwt from "jsonwebtoken";
import { publicContext } from "@/context";

export const authRouter = Router();

authRouter.get("/auth", publicContext, (req, res) => {
  if (req.ctx?.token) {
    return res.redirect("http://localhost:3000");
  }
  res.status(200).render("auth");
});

authRouter.post("/api/auth", publicContext, (req, res) => {
  if (!req.ctx?.token) {
    const { username, email, password } = req.body;
    const hashedPassword = crypto
      .createHash("sha256")
      .update(password)
      .digest("hex"); // store in DB

    const jwtToken = jwt.sign(
      { userId: 1, username, email },
      process.env.JWT_SECRET || ""
    );

    return res
      .cookie("token", jwtToken, { maxAge: 60 * 60 * 1000 }) // 30 sec
      .status(200)
      .redirect("http://localhost:3000");
  }
  res.status(200).redirect("http://localhost:3000");
});
