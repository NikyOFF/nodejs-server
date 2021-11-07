import ExpressApp from "../classes/ExpressApp";
import {EContainerName} from "@/enums/EContainerName";
import {userModel} from "@/models/User.Model";
import dependencyInjector from "./dependency.injector";
import jobsLoader from "./jobs.loader";
import mongooseLoader from "./mongoose.loader";
import expressLoader from "./express.loader";
import eventLoader from "./event.loader";

type InitOptions = {
    app: ExpressApp;
    databaseURI: string;
}

export = {
    async init({app, databaseURI}: InitOptions) {
        const modelInstances: Models.ModelInstance[] = [
            {name: EContainerName.USER_MODEL, model: userModel}
        ];

        const {agenda} = await dependencyInjector({
            models: modelInstances
        });

        await jobsLoader(agenda);

        await mongooseLoader();

        await expressLoader({expressApplication: app.expressApplication});

        await eventLoader();
    }
}
