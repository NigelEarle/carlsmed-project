import { NextFunction, Request, Response } from "express";
import logger from "../helpers/logger";

export default function errorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (res.headersSent) {
    next(error);
    return;
  }

  logger.error(error.stack);
  res.status(500).json({
    error: {
      message: 'An error occurred. Please view logs for more details'
    }
  });
}