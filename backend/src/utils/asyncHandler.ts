import { CustomRequest } from "../types/customRequest";
import { Request, Response, NextFunction } from "express";

type AsyncRequestHandler = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => Promise<any>;

export const asyncHandler = (requestHander: AsyncRequestHandler) => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    Promise.resolve(requestHander(req, res, next)).catch((err) => {
      next(err);
    });
  };
};
