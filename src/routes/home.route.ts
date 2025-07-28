import { publicContext } from "@/context";
import { Router, type Request, type Response } from "express";

export const homeRouter = Router();

homeRouter.get("/", publicContext, async ({ ctx }: Request, res: Response) => {
  res.render("home", { username: ctx?.user ? ctx.user.username : "World" });
});
