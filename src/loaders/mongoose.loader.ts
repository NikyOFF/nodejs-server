import mongoose from "mongoose";
import Logger from "./logger";

export default async () => {
    try {
        mongoose.connection.on('connecting', () => {
            Logger.info("Connecting...", {label: "MongoDB"});
        });

        mongoose.connection.on('error', (error) => {
            Logger.error(error, {label: "MongoDB"});
            mongoose.disconnect();
        });

        mongoose.connection.on('connected', () => {
            Logger.info("Connected!", {label: "MongoDB"});
        });

        mongoose.connection.on('open', () => {
            Logger.info("Connection opened!", {label: "MongoDB"});
        });

        mongoose.connection.on('reconnected', () => {
            Logger.info("Reconnected!", {label: "MongoDB"});
        });

        mongoose.connection.on('disconnected', () => {
            Logger.info("Disconnected!", {label: "MongoDB"});
        });

        Logger.verbose('Initialized', {label: 'mongooseLoader'});
    } catch (error) {
        Logger.error(error, {label: 'mongooseLoader'});
    }
}