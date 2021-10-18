import mongoose from "mongoose";
import Logger from "./logger";

type Options = {
    databaseURI: string
}

export default async ({ databaseURI }: Options) => {
    try {
        mongoose.connection.on('connecting', () => {
            Logger.info("Connecting...", { label: "MongoDB" });
        });
    
        mongoose.connection.on('error', (error) => {
            Logger.error(error, { label: "MongoDB" });
            mongoose.disconnect();
        });
    
        mongoose.connection.on('connected', () => {
            Logger.info("Connected!", { label: "MongoDB" });
        });
    
        mongoose.connection.on('open', () => {
            Logger.info("Connection oppend!", { label: "MongoDB" });
        });
    
        mongoose.connection.on('reconnected', () => {
            Logger.info("Reconnected!", { label: "MongoDB" });
        });
    
        mongoose.connection.on('disconnected', () => {
            Logger.info("Disconnected!", { label: "MongoDB" });
            mongoose.connect(databaseURI);
        });
    
        Logger.verbose('Initialized', { label: 'mongooseLoader' });
    } catch(error) {
        Logger.error(error, { label: 'mongooseLoader' });
    }
}