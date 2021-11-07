import express from "express";

import successHandler from "@/utils/successHandler";
import errorHandler from "@/utils/errorHandler";

import routes1 from "./v1";
import authRouter from "./v1/routes/auth.Router";
import userRouter from "./v1/routes/user.Router";

type Options = {
    expressApplication: express.Application;
    apiPrefix: string;
}

export default ({expressApplication, apiPrefix}: Options) => {
    expressApplication.get(`${apiPrefix}/ping`, (request, response) => {
        try {
            successHandler(response, {message: 'pong'});
        } catch (error) {
            errorHandler(response, error);
        }
    });

    expressApplication.use(`${apiPrefix}/auth`, authRouter());
    expressApplication.use(`${apiPrefix}/user`, userRouter());

    routes1({expressApplication, apiPrefix});
}