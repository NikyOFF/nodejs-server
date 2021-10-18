import ExpressApp from "../classes/ExpressApp";
import mongooseLoader from "./mongoose.loader";
import { EContainerNames } from "../enums/EContainerNames";
import { userModel } from "../models/User";
import dependencyInjector from "./dependency.injector";
import expressLoader from "./express.loader";
import "./events";

type InitOptions = {
    app: ExpressApp;
    databaseURI: string;
}

export = {
    async init ({ app, databaseURI }: InitOptions) {
        const modelInstances: Models.ModelInstance[] = [
            { name: EContainerNames.USER_MODEL, model: userModel }
        ]

        await dependencyInjector({
            models: modelInstances
        });
        
        await mongooseLoader({ databaseURI: databaseURI });

        await expressLoader({ expressApplication: app.expressApplication });
    }
}
