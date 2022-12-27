import express from 'express';
import { HttpResponseCode } from '../utils/httpResponseCode';
import errorController from './errorController';
import AuthController from './authController';
import AppError from '../utils/appError';
import jsonwebtoken from 'jsonwebtoken';
import user from '../models/userModel';
import upload from '../models/uploadModel';
import { ICaptureUpload } from '../interface/upload';

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
                new AppError(error.message || `Sorry, Bad Request`, 
                HttpResponseCode.UNAUTHORIZED
            ), {}, res);
       }
    }

    public async getUser(req: express.Request, res: express.Response) 
    {
        try {
            const { params } = req;
        
            const captureImage: ICaptureUpload | null = await upload.findOne({ slug: params.slug });
            
            if(captureImage == null) throw new Error("Imagen no encontrada");
            if(Object.keys(captureImage).length == 0) throw new Error("Imagen no encontrada");
            
            const formatUrl = `${req.protocol}://${req.headers.host}/${captureImage.slug}${captureImage.name}`;

            res.status(HttpResponseCode.OK).json({
                status: 'success',
                data: { url: formatUrl }
            });

        } catch (error: any) 
        {
            errorController.catchError( 
                new AppError(error.message || `Sorry, Bad Request`, 
                HttpResponseCode.INTERNAL_SERVER_ERROR
            ), {}, res);
        }


    }

}

export default UserController;