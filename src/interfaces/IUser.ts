export interface IUser {
    _id: string;
    login: string;
    password: string;
    email: string;
    lastLogin: Date;
}

// DTO - Data Transfer Object
export interface IUserDTO {
    login: string;
    password: string;
    email: string;
}