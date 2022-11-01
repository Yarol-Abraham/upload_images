import express from 'express';
import { dataError } from "../interface/error";

class ErrorController {

    public catchError(data: dataError, req: express.Request, res: express.Response)
    {
        if(process.env.NODE_ENV = 'development')
        {
            this.sendErrorDev(data, res);
        }
        else if(process.env.NODE_ENV = 'production')
        {
            this.sendErrorProd(data, res);
        }
    }

    private sendErrorDev(data: dataError, res: express.Response)
    {
        return res.status(data.statusCode).json({
            status: data.status,
            data: {},
            message: data.message,
            stack: data.stack            
        })
    }

    private sendErrorProd(data: dataError, res: express.Response)
    {
        return res.status(data.statusCode).json({
            status: data.status,
            data: {},
            message: data.message    
        })
    }

}

export default new ErrorController();