import { Response, Request, NextFunction } from 'express';

export class ErrorHandler extends Error {
  public statusCode: number;

  constructor(statusCode: number, message: string) {
    super();

    this.statusCode = statusCode;
    this.message = message;
  }
}

export const handleError = (err: ErrorHandler, res: Response) => {
  const { statusCode, message } = err;

  return res.status(statusCode).json({
    message,
  });
};

export const errorMidleware = (err: any, req: Request, res: Response, next: NextFunction): void => {
  handleError(err, res);
};
