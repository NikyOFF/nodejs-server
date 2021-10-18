import express from "express";
import { Router } from "express";
import sucessHandler from "../../utils/sucessHandler";

// import routes
import authRouter from "./routes/authRouter";

type Options = {
    expressApplication: express.Application;
    apiPrefix: string;
}

export default ({ expressApplication, apiPrefix }: Options) => {
    expressApplication.get(`${apiPrefix}/ping`, (_, response) => sucessHandler(response, { message: "pong" }));
    expressApplication.use(`${apiPrefix}/auth`, authRouter());
}