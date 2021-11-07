import config from "../config";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import Passport from "passport";
import routes from "../api/v1";
import Logger, {LoggerStream} from "./logger";
import passport from "@/api/middleware/passport";
import errorHandler from "@/utils/errorHandler";
import cookieParser from "cookie-parser";
import helmet from "helmet";

import bodyParse from "body-parser";

type Options = {
    expressApplication: express.Application
}

export default async ({expressApplication}: Options) => {
    try {
        const corsOptions: cors.CorsOptions = {
            origin: (origin, callback) => {
                callback(null, true);
            },
            credentials: true
        }

        expressApplication.use("/static", express.static(`${process.cwd()}/${config.UPLOADS_PATH}`));
        expressApplication.use(cors(corsOptions));
        expressApplication.use(helmet());
        expressApplication.use(morgan(':remote-addr - :remote-user ":method :url HTTP/:http-version" :status :res[content-length] - :response-time ms', {stream: new LoggerStream()}));
        expressApplication.use(express.json());
        expressApplication.use(cookieParser(config.COOKIE_SECRET));
        expressApplication.use(Passport.initialize());

        passport();
        routes({expressApplication: expressApplication, apiPrefix: config.API_PREFIX});

        expressApplication.use((error, request, response, next) => {
            if (request.errorRedirect) {
                response.redirect(request.errorRedirect);
                return;
            }

            errorHandler(response, error);
        });

        Logger.verbose("Initialized!", {label: 'expressLoader'});
    } catch (error) {
        Logger.error(error, {label: 'expressLoader'});
    }
}