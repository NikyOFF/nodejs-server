import express from "express";
import successHandler from "@/utils/successHandler";
import authRouter from "./routes/auth.Router";
import userRouter from "./routes/user.Router";
import errorHandler from "@/utils/errorHandler";

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
}