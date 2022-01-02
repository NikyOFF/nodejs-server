import {EContainerName} from "@/enums/EContainerName";
import Container from "typedi";
import Logger from "./logger";
import {Agenda} from "agenda/es";
import agenda from "@/loaders/agenda";

export default async (): Promise<{ agenda: Agenda }> => {
    try {
        const agendaInstance = agenda();

        Container.set(EContainerName.AGENDA, agendaInstance);
        Container.set(EContainerName.LOGGER, Logger);

        Logger.verbose("Injected!", {label: 'dependencyInjector'});

        return {agenda: agendaInstance};
    } catch (error) {
        Logger.error(error, {label: 'dependencyInjector'});
    }
}
