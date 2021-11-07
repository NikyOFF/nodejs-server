import config from "../config";
import winston from "winston";

const timestampFormat = 'YYYY-MM-DD HH:mm:ss';

const winstonConsoleFormat: winston.Logform.Format = winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({format: timestampFormat}),
    winston.format.errors({stack: true}),
    winston.format.splat(),
    winston.format.printf((info) => {
        let output = `[${info.timestamp}] - [${info.level}] - [${info.label ?? 'information'}] - ${info.message}`;

        const durationMs: number = info.durationMs;

        if (durationMs) {
            output = `${output}: ${durationMs} ms`
        }

        return output;
    })
);

const winstonFileFormat: winston.Logform.Format = winston.format.combine(
    winston.format.timestamp({format: timestampFormat}),
    winston.format.errors({stack: true}),
    winston.format.splat(),
    winston.format.json()
);

const transports = [
    new winston.transports.Console({format: winstonConsoleFormat, level: config.LOG_LEVEL}),
    new winston.transports.File({filename: './logs/error.log', format: winstonFileFormat, level: 'error'}),
    new winston.transports.File({filename: './logs/info.log', format: winstonFileFormat, level: 'info'}),
    new winston.transports.File({filename: './logs/verbose.log', format: winstonFileFormat, level: 'verbose'}),
    new winston.transports.File({filename: './logs/debug.log', format: winstonFileFormat, level: 'debug'}),
    new winston.transports.File({filename: './logs/silly.log', format: winstonFileFormat, level: 'silly'}),
];

const LoggerInstance = winston.createLogger({
    levels: winston.config.npm.levels,
    transports: transports,
});

export class LoggerStream {
    write(message: string) {
        LoggerInstance.http(message.substring(0, message.lastIndexOf('\n')));
    }
}

export default LoggerInstance;
