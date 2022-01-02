import {Request, Response} from "express";
import successHandler from "@/utils/successHandler";
import {User} from "@/entity/User.Entity";

export default {
    async me(request: Request, response: Response) {
        const user = request.user as User;

        successHandler(
            response,
            {
                payload: {
                    id: user.id,
                    login: user.login
                }
            }
        );
    },
}