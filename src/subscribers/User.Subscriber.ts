import { EContainerNames } from "../enums/EContainerNames";
import { EUserEvent } from "../enums/EUserEvent";
import { EventSubscriber, On } from "event-dispatch";
import { Logger } from "winston";
import Container from "typedi";
import MailService from "../services/Mail.Service";

@EventSubscriber()
export default class UserSubscriber {
    @On(EUserEvent.USER_SIGN_UP)
    async onUserSignUp({ userRecord }: { userRecord: Models.UserDocument }) {
        const logger: Logger = Container.get(EContainerNames.LOGGER);
        const mailService: MailService = Container.get(MailService);

        try {
            mailService.sendMail({
                from: "Test",
                to: userRecord.email,
                subject: "Hello ✔",
                text: "Hello world?",
                html: "<b>Hello world?</b>"
            });
    
            logger.info(`User ${userRecord.login} sign up!`, { label: `Event - ${EUserEvent.USER_SIGN_UP}` });
        } catch(error) {
            logger.error(error, { label: `Event - ${EUserEvent.USER_SIGN_UP}` });
        }
    }

    @On(EUserEvent.USER_SIGN_IN)
    async onUserSignIn({ userRecord }: { userRecord: Models.UserDocument, token: string }) {
        const logger: Logger = Container.get(EContainerNames.LOGGER);

        try {
            userRecord.updateOne({ $set: { lastLogin: new Date() } })
            .then(() => {
                userRecord.save();
            });

            logger.info(`User ${userRecord.login} sign in!`, { label: `Event - ${EUserEvent.USER_SIGN_IN}` });
        } catch(error) {
            logger.error(error, { label: `Event - ${EUserEvent.USER_SIGN_IN}` });
        }
    }
}