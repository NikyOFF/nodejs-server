import {EventSubscriber, On} from "event-dispatch";
import winston from "winston";
import Container, {Service} from "typedi";
import {Agenda} from "agenda";

import {EContainerName} from "@/enums/EContainerName";
import {EUserEvent} from "@/enums/EUserEvent";
import {IUserEventDTO} from "@/subscribers/User.Subscriber/IUserEventDTO";

@Service()
@EventSubscriber()
export default class UserSubscriber {
    constructor(
        private readonly logger: winston.Logger = Container.get(EContainerName.LOGGER),
        private readonly userModel: Models.UserModel = Container.get(EContainerName.USER_MODEL),
        private readonly agenda: Agenda = Container.get(EContainerName.AGENDA)
    ) {
    }


    @On(EUserEvent.USER_SIGN_UP)
    async onUserSignUp(data: IUserEventDTO[EUserEvent.USER_SIGN_UP]) {
        try {
            this.logger.verbose("EUserEvent.USER_SIGN_UP")
        } catch (error) {
            this.logger.error(error, {label: `Event - ${EUserEvent.USER_SIGN_UP}`});
        }
    }

    @On(EUserEvent.USER_SIGN_IN)
    async onUserSignIn(data: IUserEventDTO[EUserEvent.USER_SIGN_IN]) {
        try {
            this.logger.verbose("EUserEvent.USER_SIGN_IN")
        } catch (error) {
            this.logger.error(error, {label: `Event - ${EUserEvent.USER_SIGN_IN}`});
        }
    }
}