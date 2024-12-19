import express, { Express } from "express";
import cors from "cors";
import cookieparse from "cookie-parser";

const app: Express = express();

app.use(
  cors({
    origin: `${process.env.CORS_ORIGIN}`,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(
  express.json({
    limit: "16kb",
  })
);

app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(express.static("public"));

app.use(cookieparse());

//routes
import userRouter from "./routes/user.route";
import contentRouter from "./routes/content.route";
import brainRoute from "./routes/brain.route";
import authRouter from "./routes/auth.route";

app.use("/api/v1/user", userRouter);
app.use("/api/v1/content", contentRouter);
app.use("/api/v1/brain", brainRoute);
app.use("/api/v1/auth", authRouter);

export { app };
