import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import helmet from "helmet";
import httpStatus from "http-status";
import dotenv from "dotenv";
import cors from "cors";

import loginRouter from "./routes/loginRouter";
import signUpRouter from "./routes/signupRouter";
import projectRouter from "./routes/projectRouter";
import { limiter, signupLimiter } from "./utils/requestLimit";
import findUser from "./utils/findUser";

var app = express();

app.use(helmet());
app.use(cors());
app.use(
  helmet({
    frameguard: {
      action: "deny",
    },
  })
);

dotenv.config();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.set("trust proxy", 1);

app.use(limiter);
app.use("/api/signup", signupLimiter);

// const test = async () => {
//   const test = await findUser("Helloworld@gmail.com", "123456");
//   console.log(test);
// };

// test();

app.use("/api", loginRouter);
app.use("/api", signUpRouter);
app.use("/api", projectRouter);

// test
// error handler, send stacktrace only during development 錯誤後最後才跑這邊
app.use((err, req, res, next) => {
  res.status(err.status).json({
    message: err.isPublic ? err.message : httpStatus[err.status],
    code: err.code ? err.code : httpStatus[err.status],
    stack: process.env.NODE_ENV === "development" ? err.stack : {},
  });
  next();
});

export default app;
