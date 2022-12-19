// ----- LIBRERIES -----
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
// ------ ROUTES -----
import UserRouter from './routes/userRouter';
import uploadRouter from './routes/uploadRouter';
// ----- UTILS -----
import AppError from './utils/appError';
import { HttpResponseCode } from './utils/httpResponseCode';
// ----- ERRORS -----
import errorController from './controllers/errorController';

dotenv.config({ path: 'envconfig.env' });
const app: express.Application = express();

app.use(express.static(path.join(__dirname, 'uploads')));

app.use( express.json({ limit: '10kb' }));
app.use( express.urlencoded({ extended: true }) );

app.use( cors() );

app.use("/api/v1", UserRouter.routes());
app.use("/api/v1", uploadRouter);

app.use('*', (
    req: express.Request,
    res: express.Response
    )=> 
    errorController.catchError( 
        new AppError(`No se ha encontrado la pagina: ${req.originalUrl}`, 
        HttpResponseCode.NOT_FOUND
    ), {}, res) );

export default app;