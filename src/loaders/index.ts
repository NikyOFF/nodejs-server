import ExpressApp from "../classes/ExpressApp";
import dependencyInjector from "./dependency.injector";
import jobsLoader from "./jobs.loader";
import typeOrmLoader from "./typeOrm.loader";
import expressLoader from "./express.loader";
import eventLoader from "./event.loader";


export = {
    async init(app: ExpressApp) {
        const {agenda} = await dependencyInjector();

        await jobsLoader(agenda);

        await typeOrmLoader();

        await expressLoader({expressApplication: app.expressApplication});

        await eventLoader();
    }
}
