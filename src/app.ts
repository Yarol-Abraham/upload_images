import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import AppError from './utils/appError';
import UserRouter from './routes/userRouter';
import errorController from './controllers/errorController';
import { HttpResponseCode } from './utils/httpResponseCode';
import path from 'path';

dotenv.config({ path: 'envconfig.env' });
const app: express.Application = express();

app.use(express.static(path.join(__dirname, 'uploads')));

app.use( express.json({ limit: '10kb' }));
app.use( express.urlencoded({ extended: true }) );

app.use( cors() );

app.use("/api/v1", UserRouter.routes());

app.use('*', (
    req: express.Request,
    res: express.Response
    )=> 
    errorController.catchError( 
        new AppError(`No se ha encontrado la pagina: ${req.originalUrl}`, 
        HttpResponseCode.NOT_FOUND
    ), {}, res) );

export default app;