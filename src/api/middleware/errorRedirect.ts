import {NextFunction, Request, Response} from "express";

export default (redirect: string) => (request: Request, response: Response, next: NextFunction) => {
    request.errorRedirect = redirect
    next();
}