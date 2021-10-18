import {Router} from "express";
import {celebrate, Joi, Segments} from "celebrate";

import AuthorityController from "@/controllers/Auth.Controller";
import {EJwtStrategy} from "@/enums/EJwtStrategy";
import csrfProtection from "@/api/middleware/csrfProtection";
import {authenticate} from "@/api/middleware/passport";
import requestHandler from "@/utils/requestHandler";

export default () => {
    const router: Router = Router();

    router.post(
        '/signUp',
        celebrate({
            [Segments.BODY]: {
                login: Joi.string().required(),
                password: Joi.string().required()
            }
        }),
        authenticate(EJwtStrategy.USER_JWT, {session: false, withoutToken: true}),
        csrfProtection(['POST']),
        requestHandler(AuthorityController.signUp)
    );

    router.post(
        '/signIn',
        celebrate({
            [Segments.BODY]: {
                login: Joi.string().required(),
                password: Joi.string().required()
            }
        }),
        authenticate(EJwtStrategy.USER_JWT, {session: false, withoutToken: true}),
        csrfProtection(['POST']),
        requestHandler(AuthorityController.signIn)
    );

    router.post(
        '/logout',
        authenticate(EJwtStrategy.USER_JWT, {session: false}),
        csrfProtection(),
        requestHandler(AuthorityController.logout)
    );

    router.post(
        '/verifyToken',
        authenticate(EJwtStrategy.USER_JWT, {session: false}),
        csrfProtection(),
        requestHandler(AuthorityController.verifyToken)
    );

    router.post(
        '/verifyAdminToken',
        authenticate(EJwtStrategy.ADMIN_JWT, {session: false}),
        csrfProtection(),
        requestHandler(AuthorityController.verifyToken)
    );

    return router;
}