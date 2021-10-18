import { EContainerNames } from "../enums/EContainerNames";
import Container from "typedi";
import Logger from "./logger";
import transporter from "./transporter";

type Options = {
    models: Models.ModelInstance[]
}

export default async ({ models }: Options) => {
    try {
        models.forEach(model => {
            Container.set(model.name, model.model)
        });

        Container.set(EContainerNames.LOGGER, Logger);
        Container.set(EContainerNames.TRANSPORTER, transporter);

        Logger.verbose("Injected!", { label: 'dependencyInjector' });
    } catch(error) {
        Logger.error(error, { label: 'dependencyInjector' });
    }
}
