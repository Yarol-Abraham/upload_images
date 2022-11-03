import express from 'express';
import mongoose from 'mongoose';
import { dataError, fieldError } from "../interface/error";

class ErrorController {

    public catchError(data: dataError, error: any, res: express.Response)
    {
        if(process.env.NODE_ENV = 'development')
        {
            this.sendErrorDev(data, error, res);
        }
        else if(process.env.NODE_ENV = 'production')
        {
            this.sendErrorProd(data, error, res);
        }
    }

    public ValidatorError(error: any)
    {
        if(typeof error == 'object')
        {
            let captureErros: Array<fieldError> = [];
            Object.values(error).forEach((err: any)=> captureErros.push({ name: err.path, message: err.message }) );
            return captureErros;
        }
        else if(typeof error == 'string'){ return error; }

        return 'Sorry, Bad Request';
    }

    private sendErrorDev(data: dataError, error: any, res: express.Response)
    {
        return res.status(data.statusCode).json({
            status: data.status,
            data: {},
            message: data.message,
            errors:  this.ValidatorError(error),
            stack: data.stack            
        })
    }

    private sendErrorProd(data: dataError, error: any, res: express.Response)
    {
        return res.status(data.statusCode).json({
            status: data.status,
            data: {},
            message: data.message,
            errors: this.ValidatorError(error)    
        })
    }

}

export default new ErrorController();