import express from 'express';
import { HttpResponseCode } from '../utils/httpResponseCode';
import errorController from './errorController';
import AuthController from './authController';
import AppError from '../utils/appError';


class UserController extends AuthController {

    public async getUser(req: express.Request, res: express.Response) 
    {
        try {

        } catch (error) {
            errorController.catchError( 
                new AppError(`Sorry, Bad Request`, 
                HttpResponseCode.NOT_FOUND
            ), req, res) 
        }
    }

}

export default UserController;