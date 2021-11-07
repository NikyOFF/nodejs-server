import {EUserRole, UserRole} from "@/enums/EUserRole";

export interface IUser {
    _id: string;
    login: string;
    password: string;
    role: UserRole;
}
