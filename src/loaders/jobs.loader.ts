import {Agenda} from "agenda";
import {JobPriority} from "agenda/es";
import {EJobName} from "@/enums/EJobName";
import config from "@/config";
import Logger from "@/loaders/logger";

import exampleSequence from "@/jobs/example.Sequence";

export default async (agenda: Agenda) => {
    try {
        agenda.define(
            EJobName.EXAMPLE,
            {
                priority: JobPriority.high,
                concurrency: config.AGENDA_CONCURRENCY
            },
            exampleSequence
        )

        await agenda.start();

        Logger.verbose("Injected!", {label: 'jobsLoader'});
    } catch (error) {
        Logger.error(error, {label: 'jobsLoader'});
    }
}