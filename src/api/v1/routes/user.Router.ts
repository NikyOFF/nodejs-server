import {Router} from "express";

import {EJwtStrategy} from "@/enums/EJwtStrategy";
import UserController from "@/controllers/User.Controller";
import csrfProtection from "@/api/middleware/csrfProtection";
import {authenticate} from "@/api/middleware/passport";
import requestHandler from "@/utils/requestHandler";

export default () => {
    const router: Router = Router();

    router.get(
        '/me',
        authenticate(EJwtStrategy.USER_JWT, {session: false}),
        csrfProtection(),
        requestHandler(UserController.me)
    );

    return router;
}