import {Response} from "express";
import {Container} from "typedi";
import {Logger} from "winston";
import {EContainerName} from "@/enums/EContainerName";

export default function errorHandler(response: Response, error: Error, code: number = 400): void {
    const loggerInstance = Container.get<Logger>(EContainerName.LOGGER);

    loggerInstance.error(error.message ?? "unknown", { label: "errorHandler" });

    response.status(code).json({
        success: false,
        message: error.message ?? "error"
    });
}
