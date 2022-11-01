import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import AppError from './utils/appError';

import UserRouter from './routes/userRouter';
import ErrorController from './controllers/errorController';

dotenv.config({ path: 'envconfig.env' });
const app: express.Application = express();

app.use( express.json({ limit: '10kb' }));
app.use( express.urlencoded({ extended: true }) );

app.use( cors() );

app.use("/api/v1", UserRouter.routes());

app.use('*', (
    req: express.Request,
    res: express.Response
    )=> ErrorController.catchError( new AppError(`No se ha encontrado la pagina: ${req.originalUrl}`, 404), req, res) );

export default app;