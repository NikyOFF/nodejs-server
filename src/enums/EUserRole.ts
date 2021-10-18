export enum EUserRole {
    USER = 'user',
    ADMIN = 'admin'
}

export type UserRole = keyof typeof EUserRole;
