import { Router } from "express";
import AuthorityController from "../../../controllers/Auth.Controller";
import { celebrate, Segments, Joi } from "celebrate";

export default () => {
    const router: Router = Router();

    router.post('/signUp', celebrate({
        [Segments.BODY]: Joi.object().keys({
            login: Joi.string().required(),
            password: Joi.string().required(),
            email: Joi.string().required()
        })
    }), AuthorityController.signUp);

    router.post('/signIn', celebrate({
        [Segments.BODY]: Joi.object().keys({
            login: Joi.string().required(),
            password: Joi.string().required()
        })
    }), AuthorityController.signIn);

    return router;
}