import config from "../config";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import Passport from "passport";
import routes from "../api/v1";
import Logger from "./logger";
import { errors } from "celebrate";

type Options = {
    expressApplication: express.Application
}

export default async ({ expressApplication }: Options) => {
    try {
        expressApplication.use(morgan('dev'));
        expressApplication.use(cors());
        expressApplication.use(express.json({ limit: '100mb' }));
        expressApplication.use(Passport.initialize());

        routes({ expressApplication: expressApplication, apiPrefix: config.API_PREFIX });

        expressApplication.use(errors());
        Logger.verbose("Initialized!", { label: 'expressLoader' });
    } catch(error) {
        Logger.error(error, { label: 'expressLoader' });
    }
}