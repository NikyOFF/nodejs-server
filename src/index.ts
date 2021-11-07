import "reflect-metadata";
import config from "@/config";
import ExpressApp from "@/classes/ExpressApp";
import * as fs from "fs";

async function main() {
    console.clear();

    const exist = fs.existsSync(`${process.cwd()}/${config.UPLOADS_PATH}`);

    if (!exist) {
        fs.mkdirSync(`${process.cwd()}/${config.UPLOADS_PATH}`);
    }

    const app: ExpressApp = new ExpressApp({
        serverPort: config.SERVER_PORT,
        serverHostname: config.SERVER_HOSTNAME,
        databaseURI: config.DATABASE_URI,
    });

    await app.start();
}

main()
    .catch(console.error);
