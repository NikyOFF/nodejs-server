import {Container} from "typedi";
import {Logger} from "winston";

import {Job} from "agenda";

import {EContainerName} from "@/enums/EContainerName";
import {EJobName} from "@/enums/EJobName";
import {getRepository, Repository} from "typeorm";
import {User} from "@/entity/User.Entity";
import AuthService from "@/services/Auth.Service";

export default async (job: Job<{ user_id: string; guild_id: string }>) => {
    const loggerInstance = Container.get<Logger>(EContainerName.LOGGER);

    loggerInstance.verbose(`Example sequence job triggered!`, {label: `Job ${EJobName.EXAMPLE}`});

    try {
        const userRepositoryInstance: Repository<User> = getRepository(User);

        if (!await userRepositoryInstance.findOne({login: "admin"})) {
            const authService = Container.get(AuthService);
            await authService.signUp("admin", "admin", null);
        }

        const users: User[] = await userRepositoryInstance.find();
        console.log(`Users:`, users);
    } catch (error) {
        loggerInstance.error(error.message ?? "unknown", {label: `Job ${EJobName.EXAMPLE}`});
        await job.remove();
    }
}