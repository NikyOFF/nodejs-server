import {Response} from "express";
import {Container} from "typedi";
import {Logger} from "winston";

import {EContainerName} from "@/enums/EContainerName";

export interface ISuccessInformation {
    payload?: object,
    message?: string,
    code?: number
}

export default function successHandler(response: Response, information?: ISuccessInformation): void {
    const logger = Container.get<Logger>(EContainerName.LOGGER);

    if (information?.message) {
        logger.info(information.message, {label: "successHandler"});
    }

    response.status(information?.code ?? 200).json({
        success: true,
        message: information?.message ?? 'success',
        payload: information?.payload ?? {},
    });
}
