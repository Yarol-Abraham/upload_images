import express from 'express';
import multer from 'multer';
import sharp from 'sharp';
import AppError from '../utils/appError';
import { HttpResponseCode } from '../utils/httpResponseCode';
import errorController from './errorController';
import fs from 'fs';
const multerSotarge = multer.memoryStorage();

const multerFilter = (req: express.Request, file: any, cb: Function)=>{
    if(file.mimetype.startsWith('image')){
        cb(null, true);
    }else{
        cb(new AppError("Not an image! Please upload only image", HttpResponseCode.INTERNAL_SERVER_ERROR), false);
    };
};

const upload = multer({
    storage: multerSotarge,
    fileFilter: multerFilter
});

exports.updatePhoto = upload.single("photo");

exports.resizePhoto = async (req: express.Request, res: express.Response, next: express.NextFunction)=>{
   try{
    if(!req.file) return next();
    
    const previousImagen = __dirname+`/../uploads/${req.file.originalname}`;
    fs.unlink(previousImagen, (error)=>{
        if(error) throw new Error("Bad request upload image.");
    });

    await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`src/uploads/${req.file.originalname}`);
    next();
   } catch(error: any)
   {
    errorController.catchError( 
        new AppError(error.message || `Sorry, Bad Request`, 
        error.message ? HttpResponseCode.ERROR_CLIENT : HttpResponseCode.INTERNAL_SERVER_ERROR 
    ), {}, res);
   }
}

exports.createPhoto = (req: express.Request, res: express.Response) => {
    // TODO: SUBIR FOTO POR USUARIO
}