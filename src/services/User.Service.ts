import {Inject, Service} from "typedi";
import winston from "winston";

import {EContainerName} from "@/enums/EContainerName";
import {EventDispatcher, EventDispatcherInterface} from "@/decorators/eventDispatcher";

import {Agenda} from "agenda";


@Service()
export default class UserService {
    constructor(
        @Inject(EContainerName.LOGGER) private readonly logger: winston.Logger,
        @Inject(EContainerName.USER_MODEL) private readonly userModel: Models.UserModel,
        @EventDispatcher() private readonly eventDispatcher: EventDispatcherInterface,
        @Inject(EContainerName.AGENDA) private readonly agenda: Agenda
    ) {
    }


}
