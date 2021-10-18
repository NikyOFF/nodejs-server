import {Request, Response} from "express";
import successHandler from "@/utils/successHandler";
import {IUser} from "@/interfaces/IUser";

export default {
    async me(request: Request, response: Response) {
        const user = request.user as IUser;

        successHandler(
            response,
            {
                payload: {
                    id: user._id,
                    login: user.login
                }
            }
        );
    },
}