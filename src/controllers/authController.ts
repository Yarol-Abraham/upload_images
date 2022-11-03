import express from 'express';
import { HttpResponseCode } from '../utils/httpResponseCode';
import AppError from "../utils/appError";
import errorController from "./errorController";
import jsonwebtoken from 'jsonwebtoken';
import { _IUser } from '../interface/user';
import user from "../models/userModel";
import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

class AuthController {

    private signToken (_id: mongoose.Types.ObjectId)
    {
        return jsonwebtoken.sign({ _id }, process.env.JWT_SECRET || "LLAVE SECRETA", {
          expiresIn: process.env.JWT_EXPIRES
        });
    }

    private sendToken(user: _IUser, res: express.Response, statusCode: number)
    {
        const token =  this.signToken(user._id);
        res.status(statusCode).json({
          status: 'success',
          token,
          data: {
            user
          }
        });
    };

    public async signup(req: express.Request, res: express.Response)
    {
        try {
            const { password, passwordConfirm } = req.body;
            if(password != passwordConfirm) throw new Error("Your password not equals");
            const newUser = await user.create(req.body);
            this.sendToken(newUser, res, 201);
        } catch (error: any) 
        {
            errorController.catchError( 
                new AppError(`Sorry, Bad Request`, 
                HttpResponseCode.INTERNAL_SERVER_ERROR
            ), error.errors || error.message, res)
        }
    }

    public async login(req: express.Request, res: express.Response)
    {   
        try{
            
            const { name, password } = req.body;
            if(!name || !password) throw new Error("Your credentials is not valid");

            const _user = await user.findOne({ name }).exec();
            
            if(!_user) throw new Error("username or password is not valid");
            
            if(!bcrypt.compareSync(password, _user.password)) throw new Error("username or password is not valid");

            this.sendToken(_user, res, 200);

        }catch(error: any)
        {
            errorController.catchError( 
                new AppError(`Sorry, Bad Request`, 
                HttpResponseCode.INTERNAL_SERVER_ERROR
            ), error.message, res)
        }
    }

}

export default AuthController;