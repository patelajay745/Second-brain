import express, { Express } from "express";
import cors from "cors";
import cookieparse from "cookie-parser";

const app: Express = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
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
import userRouter from "@/routes/user.route";
import contentRouter from "@/routes/content.route";
import brainRoute from "@/routes/brain.route";

app.use("/api/v1/user", userRouter);
app.use("/api/v1/content", contentRouter);
app.use("/api/v1/brain", brainRoute);

export { app };
