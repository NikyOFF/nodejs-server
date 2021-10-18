import {Request, Response, NextFunction} from "express";

export default (fn: (request: Request, response: Response, next?: NextFunction) => Promise<any>) => async (request: Request, response: Response, next: NextFunction) => {
    await fn(request, response, next)
        .catch(error => {
            return next(error);
        });
}