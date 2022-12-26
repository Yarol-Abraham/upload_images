import express from 'express';
import multer from 'multer';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import AppError from '../utils/appError';
import { HttpResponseCode } from '../utils/httpResponseCode';
import errorController from './errorController';
import upload from '../models/uploadModel';

const multerStorage = multer.memoryStorage();

const multerFilter = (req: express.Request, file: any, cb: Function)=>{
    if(file.mimetype.startsWith('image')){
        cb(null, true);
    }else{
        cb(new AppError("Not an image! Please upload only image", HttpResponseCode.INTERNAL_SERVER_ERROR), false);
    };
};

const uploadPhoto = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});

exports.updatePhoto = uploadPhoto.single("photo");

exports.deletePhoto = (req: express.Request)=> {
    const previousImagen = __dirname+`\\..\\uploads\\${req.file?.originalname}`;
    if(fs.existsSync(previousImagen))
    {
        fs.unlink(previousImagen.toString(), (error)=>{
            if(error) throw new Error("Bad request upload image.");
        });
    }
}

exports.resizePhoto = async (req: express.Request, res: express.Response, next: express.NextFunction)=>{
   try{
        if(!req.file) return next();
        res.locals.uuid = uuidv4();

        await sharp(req.file.buffer)
        .resize(500, 500)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`src/uploads/${res.locals.uuid}${req.file.originalname}`);
        next();
   } catch(error: any)
   {
        errorController.catchError( 
            new AppError(error.message || `Sorry, Bad Request`, 
            error.message ? HttpResponseCode.ERROR_CLIENT : HttpResponseCode.INTERNAL_SERVER_ERROR 
        ), {}, res);
   }
}


exports.createPhoto = async (req: express.Request, res: express.Response) => {
    
    try {
        const { user } = res.locals;
        const { file } = req;
        let newPhoto = await upload.create({ name: file?.originalname, user: user._id.toString(), slug: res.locals.uuid });
        
        res.status(HttpResponseCode.OK).json({
            status: 'success',
            data: newPhoto
        });

    } catch (error: any) 
    {
        errorController.catchError( 
            new AppError(error.message || `Sorry, Bad Request`, 
            error.message ? HttpResponseCode.ERROR_CLIENT : HttpResponseCode.INTERNAL_SERVER_ERROR 
        ), {}, res);
    }
}