import {IUser} from "@/interfaces/IUser";

export interface IUserEventDTO {
    user_sign_up: {user: IUser, tokenType: string, token: string};
    user_sign_in: {user: IUser, tokenType: string, token: string};
}