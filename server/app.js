import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import APPError from "./utils/AppError";

import indexRouter from "./routes/indexRouter";
import usersRouter from "./routes/usersRouter";
import loginRouter from "./routes/loginRouter";
import signUpRouter from "./routes/signupRouter";
import projectRouter from "./routes/projectRouter";

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/api", loginRouter);
app.use("/api", signUpRouter);
app.use("/api", projectRouter);

// Route to be tested
app.get("/", (req, res) => {
  return res.status(200).json({ nome: "Handsome Charles Sin" });
});

// if error is not an instanceOf APIError, convert it.
app.use((err, req, res, next) => {
  let errorMessage;
  let errorCode;
  let errorStatus;
  // express validation error 所有傳入參數驗證錯誤
  if (err instanceof expressValidation.ValidationError) {
    if (
      err.errors[0].location === "query" ||
      err.errors[0].location === "body"
    ) {
      errorMessage = err.errors[0].messages;
      errorCode = 400;
      errorStatus = httpStatus.BAD_REQUEST;
    }
    const error = new APPError.APIError(
      errorMessage,
      errorStatus,
      true,
      errorCode
    );
    return next(error);
  }
  return next(err);
});

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
