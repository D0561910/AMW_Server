import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 3 * 60 * 1000, // 限制時間
  max: 500, // 限制請求數量
  message: 'Too many requests, please try again later!'
});

const signupLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 限制時間
  max: 10, // 限制請求數量
  message: 'Too many requests, please try again later!'
});

export { limiter, signupLimiter };
