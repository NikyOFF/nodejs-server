export enum EJwtStrategy {
    USER_JWT = 'user-jwt',
    ADMIN_JWT = 'admin-jwt'
}

export type JwtStrategy = keyof typeof EJwtStrategy;
