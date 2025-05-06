import rateLimit from 'express-rate-limit';

// FUTURE: create custom rate limiting middleware for individual IP address
export default rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: 'Too many requests inside of the alotted window, please wait 15 minutes and try again',
});