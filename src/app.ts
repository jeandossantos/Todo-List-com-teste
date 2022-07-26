import 'express-async-errors';
import 'dotenv/config';

import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { CustomException } from './exceptions/CustomException';

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  (
    error: Error | CustomException,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (error instanceof CustomException) {
      return res.status(error.code).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      status: 'Error',
      message: 'Internal server error',
    });
  }
);

export { app };
