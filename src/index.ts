import "reflect-metadata";
import config from "@/config";
import ExpressApp from "@/classes/ExpressApp";

import logger from "./loaders/logger";

async function main() {
    console.clear();

    const app: ExpressApp = new ExpressApp({
        serverPort: config.SERVER_PORT,
        serverHostname: config.SERVER_HOSTNAME,
        databaseURI: config.DATABASE_URI,
    });

    logger.profile(1)
    await app.start();
    logger.profile(1)
}

main()
    .catch(console.error);
