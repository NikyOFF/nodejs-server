import { Request, Response } from "express";
import Container from "typedi";
import { IUserDTO } from "../interfaces/IUser";
import AuthService from "../services/Auth.Service";
import errorHandler from "../utils/errorHandler";
import sucessHandler from "../utils/sucessHandler";

export = {
    async signUp(request: Request, response: Response) {
        try {
            const userDTO = <IUserDTO>request.body;

            const authService = Container.get(AuthService);

            const { user, token } = await authService.signUp(userDTO);

            sucessHandler(response, {
                message: "User registred!",
                data: {
                    id: user._id,
                    token: token
                }
            });
        } catch(error) {
            errorHandler(response, error);
        }
    },

    async signIn(request: Request, response: Response) {
        try {
            const userDTO = <{ login: string, password: string }>request.body;

            const authService: AuthService = Container.get(AuthService);

            const { user, token } = await authService.signIn(userDTO.login, userDTO.password);

            sucessHandler(response, {
                message: "User authorized!",
                data: {
                    id: user._id,
                    token: token
                }
            });
        } catch(error) {
            errorHandler(response, error);
        }
    }
}