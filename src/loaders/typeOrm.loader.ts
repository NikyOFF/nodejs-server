import {createConnection} from "typeorm";
import Logger from "./logger";

export default async () => {
    Logger.info("Create type orm connection...");
    await createConnection()
    Logger.info("Connection created!");
}
