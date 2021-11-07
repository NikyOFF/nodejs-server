import {Inject, Service} from "typedi";
import {IUser} from "@/interfaces/IUser";
import {EventDispatcher, EventDispatcherInterface} from "../decorators/eventDispatcher";
import {EUserEvent} from "@/enums/EUserEvent";
import winston from "winston";
import bcryptjs from "../utils/bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import config from "../config";
import {EContainerName} from "@/enums/EContainerName";

@Service()
export default class AuthService {
    constructor(
        @Inject(EContainerName.LOGGER) private logger: winston.Logger,
        @Inject(EContainerName.USER_MODEL) private userModel: Models.UserModel,
        @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
    ) {
    }

    public async signUp(login: string, password: string, csrf: string): Promise<{ user: IUser, token: string }> {
        this.logger.verbose("Trying to find a user with the same login", {label: "Auth.Service - register"});
        const candidate: Models.UserDocument = await this.userModel.findOne({login: login});

        if (candidate) {
            throw new Error("User login already taken!");
        } else {
            this.logger.verbose("Login is not busy", {label: "Auth.Service - register"});
        }

        this.logger.verbose('Hashing password', {label: "Auth.Service - register"});
        const hashedPassword = bcryptjs.hashSync(password);

        this.logger.verbose("Creating user record in database", {label: "Auth.Service - register"});
        const userRecord: Models.UserDocument = await this.userModel.create({
            login: login,
            password: hashedPassword
        });

        if (!userRecord) {
            throw new Error("User cannot be created");
        }

        this.logger.verbose("Generating JWT", {label: "Auth.Service - login"});
        const token: string = this.generateToken(userRecord._id, csrf);

        this.logger.verbose(`Dispatch ${EUserEvent.USER_SIGN_UP} event`, {label: "Auth.Service - register"});
        this.eventDispatcher.dispatch(EUserEvent.USER_SIGN_UP, {userRecord: userRecord});

        return {user: userRecord, token: token};
    }

    public async signIn(login: string, password: string, csrf: string): Promise<{ user: IUser, token: string }> {
        this.logger.verbose("Trying to find a user", {label: "Auth.Service - login"});
        const userRecord: Models.UserDocument = await this.userModel.findOne({login: login});

        if (!userRecord) {
            throw new Error("User not registered");
        } else {
            this.logger.verbose("Login found", {label: "Auth.Service - login"});
        }

        this.logger.verbose("Checking password", {label: "Auth.Service - login"});
        const passwordResult: boolean = bcryptjs.compareSync(password, userRecord.password);

        if (!passwordResult) {
            throw new Error("Invalid password");
        } else {
            this.logger.verbose('Password is valid', {label: "Auth.Service - login"});
        }

        this.logger.verbose("Generating JWT", {label: "Auth.Service - login"});
        const token: string = this.generateToken(userRecord._id, csrf);

        this.logger.verbose(`Dispatch ${EUserEvent.USER_SIGN_IN} event`, {label: "Auth.Service - login"});
        this.eventDispatcher.dispatch(EUserEvent.USER_SIGN_IN, {userRecord: userRecord, token: token});

        return {user: userRecord, token: token};
    }

    private generateToken(id: string, csrf: string): string {
        this.logger.silly(`Sign JWT for userId: ${id}`);
        return jsonwebtoken.sign(
            {
                _id: id,
                _csrf: csrf,
            },
            config.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );
    }
}
