import {Request, Response} from "express";
import Container from "typedi";
import AuthService from "../services/Auth.Service";
import errorHandler from "../utils/errorHandler";
import successHandler from "../utils/successHandler";
import config from "@/config";

export default {
    async signUp(request: Request, response: Response) {
        try {
            const {login, password} = <{ login: string, password: string }>request.body;
            const authService = Container.get(AuthService);
            const xsrfToken = request.csrfToken();
            const {token} = await authService.signUp(login, password, xsrfToken);

            response.cookie('XSRF-TOKEN', xsrfToken, {
                secure: config.SERVER_PROTOCOL === 'https',
                sameSite: 'strict'
            });

            response.cookie('TOKEN', token, {
                secure: config.SERVER_PROTOCOL === 'https',
                httpOnly: true,
                sameSite: 'strict'
            });

            successHandler(response, {
                message: "User registered!",
            });
        } catch (error) {
            errorHandler(response, error);
        }
    },

    async signIn(request: Request, response: Response) {
        try {
            const {login, password} = <{ login: string, password: string }>request.body;
            const authService: AuthService = Container.get(AuthService);
            const xsrfToken = request.csrfToken();
            const {token} = await authService.signIn(login, password, xsrfToken);

            response.cookie('XSRF-TOKEN', xsrfToken, {
                secure: config.SERVER_PROTOCOL === 'https',
                sameSite: 'strict'
            });

            response.cookie('TOKEN', token, {
                secure: config.SERVER_PROTOCOL === 'https',
                httpOnly: true,
                sameSite: 'strict'
            });

            successHandler(response, {
                message: "User authorized!",
            });
        } catch (error) {
            errorHandler(response, error);
        }
    },

    async logout(request: Request, response: Response) {
        response.clearCookie('TOKEN');
        successHandler(response);
    },

    async verifyToken(request: Request, response: Response) {
        successHandler(response);
    }
}