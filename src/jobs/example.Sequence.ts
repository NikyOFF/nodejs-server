import {Container} from "typedi";
import {Logger} from "winston";

import {Job} from "agenda";

import {EContainerName} from "@/enums/EContainerName";
import {EJobName} from "@/enums/EJobName";

export default async (job: Job<{ user_id: string; guild_id: string }>) => {
    const loggerInstance = Container.get<Logger>(EContainerName.LOGGER);

    loggerInstance.verbose(`Example sequence job triggered!`, {label: `Job ${EJobName.EXAMPLE}`});

    try {

    } catch (error) {
        loggerInstance.error(error.message ?? "unknown", {label: `Job ${EJobName.EXAMPLE}`});
        await job.remove();
    }
}