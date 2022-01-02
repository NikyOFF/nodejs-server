import {NextFunction, Request, Response} from "express";
import passport, {AuthenticateOptions} from "passport";
import {Strategy, StrategyOptions, VerifyCallback} from "passport-jwt";
import config from "@/config"
import {EJwtStrategy, JwtStrategy} from "@/enums/EJwtStrategy";
import {EUserRole} from "@/enums/EUserRole";
import {getRepository, Repository} from "typeorm";
import {User} from "@/entity/User.Entity";

//Strategy options
const userOptions: StrategyOptions = {
    jwtFromRequest: (request) => {
        return request.cookies['TOKEN'];
    },
    secretOrKey: config.JWT_SECRET
}

//General verify
const verifyUser = (valid: (userRecord: User) => boolean) => async (payload, done) => {
    const userRepositoryInstance: Repository<User> = getRepository(User);

    const userCandidate = await userRepositoryInstance.findOne({id: payload['id']});

    if (!userCandidate) {
        return done(new Error("[verify] Unauthorized"));
    }

    const haveAccess = valid(userCandidate);

    if (!haveAccess) {
        return done(new Error("[verify] does not have access"));
    }

    return done(null, userCandidate, payload['_csrf']);
}

//Concrete verify callbacks
const userVerify: VerifyCallback = verifyUser(userRecord => EUserRole[userRecord.role] >= EUserRole.USER);
const adminVerify: VerifyCallback = verifyUser(userRecord => EUserRole[userRecord.role] >= EUserRole.ADMIN);

//Authenticate
const getStrategyFromHeader = (strategy: EJwtStrategy[], request: Request): EJwtStrategy => {
    const strategyFromHeader = request.headers['x-strategy'] as JwtStrategy;
    return  EJwtStrategy[strategyFromHeader] || strategy[0];
}

interface Options extends AuthenticateOptions {
    withoutToken?: boolean;
}

export const authenticate = (strategy: EJwtStrategy | EJwtStrategy[], options: Options) => (request: Request, response: Response, next: NextFunction) => {
    const localStrategy = strategy instanceof Array ? getStrategyFromHeader(strategy, request) : strategy;

    passport.authenticate(localStrategy, options, (error, record, info) => {
        if (options.withoutToken) {
            if (record) {
                return next(new Error("[callback] Authorized"));
            } else {
                return next();
            }
        }

        if (error) {
            return next(error);
        }

        if (!record) {
            response.clearCookie('TOKEN');

            return next(new Error("[callback] Unauthorized"));
        }

        if (info !== request.cookies['XSRF-TOKEN'] || info !== request.headers['x-xsrf-token']) {
            response.clearCookie('TOKEN');
            return next(new Error("[callback] invalid csrf"));
        }

        request.user = record;
        return next();
    })(request, response, next);
}

export default () => {
    passport.use(EJwtStrategy.USER_JWT, new Strategy(userOptions, userVerify));
    passport.use(EJwtStrategy.ADMIN_JWT, new Strategy(userOptions, adminVerify));
}
