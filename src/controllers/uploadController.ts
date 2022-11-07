import express from 'express';
import multer from 'multer';
import sharp from 'sharp';

class UploadController {

    public multerFilter (req: express.Request, file: any, cb: Function) 
    {
        if(file.mimetype.startsWith('image')){
            cb(null, true);
        }else{
            cb(new Error("Not an image! Please upload only image"), false);
        };
    }

    public createUpload(req: express.Request, res: express.Response )
    {
        try {
            
        } catch (error) {
            console.log(error);
        }
    }

}

export default UploadController;