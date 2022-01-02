import express from "express";
import http from "http";
import loaders from "@/loaders";
import Logger from "@/loaders/logger";
import config from "@/config";

export default class ExpressApp {
    public server: http.Server = null;
    public expressApplication = express();

    protected serverPort: number;
    protected serverHostname: string;
    protected databaseURI: string;

    constructor() {
        this.serverPort = config.SERVER_PORT;
        this.serverHostname = config.SERVER_HOSTNAME;
        this.databaseURI = config.DATABASE_URI;
    }

    async start(): Promise<void> {
        console.clear();

        await loaders.init(this);

        this.server = this.expressApplication.listen(this.serverPort, this.serverHostname, () => {
            Logger.info(`Server started on ${config.SERVER_PROTOCOL}://${this.serverHostname}:${this.serverPort}/`, {label: "Express"});
        });

        this.server.on('error', error => {
            Logger.error(error);
            process.exit();
        });
    }
}
