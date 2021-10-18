import {NextFunction, Request, Response} from "express";
import csrf from "csurf";

export default (ignoreMethods: string[] = []) => (request: Request, response: Response, next: NextFunction) => {
    if (request.ignoreCsrf) {
        return next();
    }

    csrf({
        cookie: {
            signed: true,
            httpOnly: true,
            sameSite: 'strict'
        },
        ignoreMethods: ignoreMethods
    })(request, response, next);
}
