export enum EUserRole {
    USER,
    ADMIN
}

export type UserRole = keyof typeof EUserRole;
