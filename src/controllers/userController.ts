import express from 'express';
import { HttpResponseCode } from '../utils/httpResponseCode';
import errorController from './errorController';
import AppError from '../utils/appError';

class UserController {

    public async getUser(req: express.Request, res: express.Response) 
    {
        try {

        } catch (error) {
            errorController.catchError( 
                new AppError(`Ocurrio un error inesperado, vuelve a intentarlo!`, 
                HttpResponseCode.NOT_FOUND
            ), req, res) 
        }
    }

}

export default UserController;