import { Router } from "express";
import path from "node:path";
import fs from "node:fs";
import { publicContext } from "@/context";

export const scriptRouter = Router();

scriptRouter.get("/browser.js", publicContext, async (req, res) => {
  res.setHeader("Content-Type", "application/javascript");
  res.sendFile("browser.js", {
    root: path.join(__dirname, "../script"),
  });
});

scriptRouter.get("/server.js", publicContext, async (req, res) => {
  const userData = req.ctx?.user;

  const template = fs.readFileSync(
    path.join(__dirname, "../script/server.js"),
    "utf-8"
  );

  const injected = template.replace(
    "__USER_DATA__",
    JSON.stringify(userData ?? undefined) // null if not logged in
  );

  res.setHeader("Content-Type", "application/javascript");
  res.send(injected);
});
