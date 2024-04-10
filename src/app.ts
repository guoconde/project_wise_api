import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';

import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: process.env.ALLOWED_ORIGIN,
  }),
);

app.get('/', (request: Request, response: Response) => {
  return response.json({ message: 'Hello World' });
});

app.use((error: Error, request: Request, response: Response, _next: NextFunction) => {
  // eslint-disable-next-line no-console
  console.error(error);

  return response.status(500).json({
    message: 'Internal Server Error',
  });
});

export default app;
