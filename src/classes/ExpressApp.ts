import express from "express";
import http from "http";
import loaders from "@/loaders";
import Logger from "@/loaders/logger";
import config from "@/config";

export default class ExpressApp {
    public server: http.Server = null;
    public expressApplication = express();

    async start(): Promise<void> {
        console.clear();

        await loaders.init(this);

        this.server = this.expressApplication.listen(config.SERVER_PORT, config.SERVER_HOSTNAME, () => {
            Logger.info(`Server started on ${config.SERVER_PROTOCOL}://${config.SERVER_HOSTNAME}:${config.SERVER_PORT}/`, {label: "Express"});
        });

        this.server.on('error', error => {
            Logger.error(error);
            process.exit();
        });
    }
}
