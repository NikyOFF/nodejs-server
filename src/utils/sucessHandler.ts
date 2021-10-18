import { Response } from "express";

export interface ISucessInformation {
    data?: object,
    message?: string,
    code?: number
}


export default function sucessHandler(response: Response, information?: ISucessInformation): void {
    response.status(information?.code ?? 200).json({
        success: true,
        message: information?.message ?? 'success',
        data: information?.data ?? {},
    });
}
