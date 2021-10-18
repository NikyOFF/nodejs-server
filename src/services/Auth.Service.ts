import { Inject, Service } from "typedi";
import { EContainerNames } from "../enums/EContainerNames";
import { IUser, IUserDTO } from "../interfaces/IUser";
import { EventDispatcher, EventDispatcherInterface } from "../decorators/eventDispatcher";
import { EUserEvent } from "../enums/EUserEvent";
import winston from "winston";
import bcryptjs from "../utils/bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import config from "../config";

@Service()
export default class AuthService {
    constructor(
        @Inject(EContainerNames.LOGGER) private logger: winston.Logger,
        @Inject(EContainerNames.USER_MODEL) private userModel: Models.UserModel,
        @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
    ){ }

    public async signUp(userDTO: IUserDTO): Promise<{ user: IUser, token: string }> {
        this.logger.verbose("Trying to find a user with the same login", { label: "Auth.Service - register" });
        const candidate: Models.UserDocument = await this.userModel.findOne({ login: userDTO.login });

        if (candidate) {
            throw new Error("User login already taken!");
        } else {
            this.logger.verbose("Login is not busy", { label: "Auth.Service - register" });
        }

        this.logger.verbose('Hashing password', { label: "Auth.Service - register" });
        const hashedPassword = bcryptjs.hashSync(userDTO.password);

        this.logger.verbose("Creating user record in database", { label: "Auth.Service - register" });
        const userRecord: Models.UserDocument = await this.userModel.create({
            ...userDTO,
            password: hashedPassword
        });

        if (!userRecord) {
            throw new Error("User cannot be created");
        }

        this.logger.verbose("Generating JWT", { label: "Auth.Service - login" });
        const token: string = this.generateToken(userRecord._id);

        this.logger.verbose(`Dispatch ${EUserEvent.USER_SIGN_UP} event`, { label: "Auth.Service - register" });
        this.eventDispatcher.dispatch(EUserEvent.USER_SIGN_UP, { userRecord: userRecord });

        return { user: userRecord, token: token };
    }

    public async signIn(login: string, password: string): Promise<{ user: IUser, token: string }> {
        try {
            this.logger.verbose("Trying to find a user", { label: "Auth.Service - login" });
            const userRecord: Models.UserDocument = await this.userModel.findOne({ login: login });

            if (!userRecord) {
                throw new Error("User not registered");
            } else {
                this.logger.verbose("Login found", { label: "Auth.Service - login" });
            }

            this.logger.verbose("Checking password", { label: "Auth.Service - login" });
            const passwordResult: boolean = bcryptjs.compareSync(password, userRecord.password);

            if (!passwordResult) {
                throw new Error("Invalid password");
            } else {
                this.logger.verbose('Password is valid', { label: "Auth.Service - login" });
            }

            this.logger.verbose("Generating JWT", { label: "Auth.Service - login" });
            const token: string = this.generateToken(userRecord._id);

            this.logger.verbose(`Dispatch ${EUserEvent.USER_SIGN_IN} event`, { label: "Auth.Service - login" });
            this.eventDispatcher.dispatch(EUserEvent.USER_SIGN_IN, { userRecord: userRecord, token: token });

            return { user: userRecord, token: token };
        } catch(error) {
            this.logger.error(error, { label: "Auth.Service - login" });
        }
    }

    private generateToken(user: IUser): string {
        const today = new Date();
        const exp = new Date(today);
        exp.setDate(today.getDate() + 60);

        this.logger.silly(`Sign JWT for userId: ${user._id}`);
        return jsonwebtoken.sign(
            {
                _id: user._id,
                login: user.login,
            },
            config.JWT_SECRET,
            {
                expiresIn: "30d"
            }
        );
    }
}
