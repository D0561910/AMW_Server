import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import helmet from "helmet";

import loginRouter from "./routes/loginRouter";
import signUpRouter from "./routes/signupRouter";
import projectRouter from "./routes/projectRouter";

var app = express();

app.use(helmet());
app.use(
  helmet({
    frameguard: {
      action: "deny",
    },
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api", loginRouter);
app.use("/api", signUpRouter);
app.use("/api", projectRouter);

// error handler, send stacktrace only during development 錯誤後最後才跑這邊
app.use((err, req, res, next) => {
  res.status(err.status).json({
    message: err.isPublic ? err.message : httpStatus[err.status],
    code: err.code ? err.code : httpStatus[err.status],
    stack: config.env === "development" ? err.stack : {},
  });
  next();
});

export default app;
