import user from "../models/userModel";
import AppError from "../utils/appError";
import errorController from "./errorController";
import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';

class AuthController {

    constructor()
    {
        dotenv.config({ path: 'envconfig.env' })
    }

    public signToken (_id: number)
    {
        return jsonwebtoken.sign({ _id }, process.env.JWT_SECRET || "LLAVE SECRETA", {
          expiresIn: process.env.JWT_EXPIRES
        });
    }

    public signup()
    {

    }

}

export default AuthController;