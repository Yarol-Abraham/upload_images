import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app';

class Server {

    app: express.Application = app;

    constructor()
    {
        dotenv.config({ path: 'envconfig.env' });

        this.UncaughtException();

        this.ConnectionDB();

        this.UnhandledRejection(this.ConnectionServer());

    }

    private ConnectionServer()
    {
        //connect server
        const port = process.env.PORT || '5000';
        return app.listen(port, ()=>{
            console.log(`server connect success in port:${port}`);
            console.log(`mode: ${process.env.NODE_ENV}`);
        });
    }

    private ConnectionDB()
    { 
        let DB: string = process.env.DB_CONNECTION || "";
        DB = DB.replace('<user>', process.env.USER_NAME || "");
        DB = DB.replace('<password>', process.env.PASSWORD || "" );
        mongoose.connect(DB)
        .then(()=> console.log('db connect success') )
        .catch(()=> { console.log("db connect faul"); })
    }

    private UncaughtException()
    {
        process.on('uncaughtException', err =>{
            console.log(err.name, err.message);
            console.log("UNCAUGHT EXCEPTION :( shutting down...");
            console.log(err.name, err.message);
        });
    }

    private UnhandledRejection(server: any)
    {
        //capture errors
        process.on('unhandledRejection', (err: any) =>{
            console.log('UNHANDLE REJECTION :( shutting down...');
            console.log(err.name || "Error: ", err.message || "Error inesperado");
            server.close(()=>{
                process.exit(1);
            });
        })
    }

}

new Server();