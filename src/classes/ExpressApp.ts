import express from "express";
import mongoose from "mongoose";
import http from "http";
import loaders from "../loaders";
import Logger from "../loaders/logger";

type ExpressAppConfig = {
    databaseURI: string;
    serverPort?: number;
    serverHostname?: string;
    middlewares?: express.Handler[];
}

export default class ExpressApp {
    public server: http.Server = null;
    public expressApplication = express();

    protected serverPort: number;
    protected serverHostname: string;
    protected databaseURI: string;

    constructor(config: ExpressAppConfig) {
        this.serverPort = config.serverPort ?? 20000;
        this.serverHostname = config.serverHostname ?? 'localhost';
        this.databaseURI = config.databaseURI;
    }

    async start(): Promise<void> {
        console.clear();

        await loaders.init({app: this, databaseURI: this.databaseURI});

        await mongoose.connect(this.databaseURI);

        this.server = this.expressApplication.listen(this.serverPort, this.serverHostname, () => {
            Logger.info(`Server started on http://${this.serverHostname}:${this.serverPort}/`, {label: "Express"});
        });

        this.server.on('error', error => {
            Logger.error(error);
            process.exit();
        });
    }
}
