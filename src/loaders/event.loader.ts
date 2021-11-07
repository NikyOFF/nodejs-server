import Logger from "./logger";

export default async () => {
    try {
        await import("@/subscribers");

        Logger.verbose('Initialized', {label: 'eventLoader'});
    } catch (error) {
        Logger.error(error, {label: 'eventLoader'});
    }
}
