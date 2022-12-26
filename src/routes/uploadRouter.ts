import express from 'express';
const _uploadController = require("../controllers/uploadController");
import UserController from '../controllers/userController';
const uploadRouter = express.Router();

const _UserController  = new UserController();

uploadRouter.use( (req, res, next)=> _UserController.protect(req,res,next) );

uploadRouter.post(
  "/upload/image", 
  _uploadController.updatePhoto,
  _uploadController.resizePhoto,
  _uploadController.createPhoto
);

export default uploadRouter;