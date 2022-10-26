import { NextFunction, Response } from 'express';
import { Prisma } from '@prisma/client';
import { captureException } from '@sentry/node';
import { validationResult } from 'express-validator';

import type { AppError, AuthenticatedRequest, CreateErr } from '../../types';

export const createError: CreateErr = (
  message,
  code = 403,
  validations = null,
) => {
  const err = new Error(message);
  // @ts-ignore
  err.code = code;
  // @ts-ignore
  err.validations = validations;
  return err;
};

export const success = (msg: string, data: any, meta?: object) => ({
  data,
  status: true,
  message: msg,
  ...(meta && { meta }),
});

export function errorHandler(
  error: AppError,
  req: any,
  res: Response,
  _next: any,
) {
  try {
    if (error.validations) {
      return res.status(422).json({
        status: false,
        message: 'All fields are required',
        data: error.validations,
      });
    }

    let code = error.code || 500;
    let msg = error.message;

    if (!code) {
      if (
        error instanceof Prisma.PrismaClientValidationError ||
        error instanceof Prisma.PrismaClientKnownRequestError
      ) {
        code = 422;
      } else {
        code = 500;
        msg = error.message || 'Exception 500! Operation failed.';
      }
    }

    // eslint-disable-next-line no-console
    console.log(error.name || 'Error', error.message, error.stack);

    captureException(error);
    req?.transaction?.finish();
    return res.status(code || 500).json({ status: false, message: msg });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    return res.status(500).json({ status: false });
  }
}

export const forwardRequest = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  const { app } = req;
  // eslint-disable-next-line no-underscore-dangle
  return app._router.handle(req, res, next);
};

export const validate = (
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction,
) => {
  try {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      return next();
    }

    const extractedErrors: {}[] = [];
    errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

    throw createError('Validation failed', 400, extractedErrors);
  } catch (e) {
    return next(e);
  }
};
