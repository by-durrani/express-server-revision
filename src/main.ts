import express, { type Request, type Response } from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import fs from "node:fs";

import { config } from "./config/config";
import path from "node:path";
import { authRouter } from "./routes/auth.route";
import { scriptRouter } from "./routes/scripts.route";
import { homeRouter } from "./routes/home.route";

// all config using global
config();

const app = express();
// EXPRESS MIDDLEWARES
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          "https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4",
        ], // 👈 allow Tailwind CDN
        styleSrc: ["'self'", "'unsafe-inline'"],
        objectSrc: ["'none'"],
      },
    },
  })
);
app.use(cors({ origin: "*" }));

// initialize rate limiter to prevent ddos
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
});
app.use(limiter);

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

// routes
app.use(homeRouter);
app.use(authRouter);
app.use(scriptRouter);

// express is listening
app
  .listen(`${PORT}`, () =>
    console.log(`app is running on http://localhost:${PORT}`)
  )
  .on("error", (err) => console.error(err));
