import express from 'express';
import { HttpResponseCode } from '../utils/httpResponseCode';
import errorController from './errorController';
import AuthController from './authController';
import AppError from '../utils/appError';
import jsonwebtoken from 'jsonwebtoken';
import user from '../models/userModel';

class UserController extends AuthController {

    public token: string = "";
    
    public async protect(req: express.Request, res: express.Response, next: express.NextFunction)
    {
       try
       {
            this.token = "";
            if(
                req.headers.authorization &&
                req.headers.authorization.startsWith('Bearer')
            ) this.token = req.headers.authorization.split(' ')[1];

            if(this.token == "") throw new Error("No tienes permisos para esta acción");
            
            const decoded = await jsonwebtoken.verify(this.token, process.env.JWT_SECRET || "LLAVE SECRETA");
            const _user = await user.findById((<any>decoded)._id);

            res.locals.user = _user;

            next();
       }catch(error: any)
       {
            errorController.catchError( 
                new AppError(error.message, 
                HttpResponseCode.UNAUTHORIZED
            ), {}, res);
       }
    }

}

export default UserController;