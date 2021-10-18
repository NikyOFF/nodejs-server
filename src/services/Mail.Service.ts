import { EContainerNames } from "../enums/EContainerNames";
import { Inject, Service } from "typedi";
import winston from "winston";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

@Service()
export default class MailService {
    constructor(
        @Inject(EContainerNames.LOGGER) private logger: winston.Logger,
        @Inject(EContainerNames.TRANSPORTER) private transporter: nodemailer.Transporter,
    ){ }

    public async sendMail(options: Mail.Options) {
        this.logger.verbose("Send mail", { label: "Mail.Service - sendMail" });
        const info = await this.transporter.sendMail(options);
        return info;
    }
}