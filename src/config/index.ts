import dotenv from "dotenv";

const configOutput = dotenv.config();

if (configOutput.error) {
    throw new Error();
}

import agenda from "./agenda";

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.SERVER_PROTOCOL = (['https', 'http']).includes(process.env.SERVER_PROTOCOL) ? process.env.SERVER_PROTOCOL : 'http';

export default {
    NODE_ENV: process.env.NODE_ENV,
    LOG_LEVEL: process.env.LOG_LEVEL,
    UPLOADS_PATH: process.env.UPLOADS_PATH,
    SERVER_PROTOCOL: process.env.SERVER_PROTOCOL,
    SERVER_PORT: parseInt(process.env.SERVER_PORT, 10),
    SERVER_HOSTNAME: process.env.SERVER_HOSTNAME,
    DATABASE_URI: process.env.DATABASE_URI,
    API_PREFIX: process.env.API_PREFIX,
    BCRYPT_SECRET: process.env.BCRYPT_SECRET,
    JWT_SECRET: process.env.JWT_SECRET,
    COOKIE_SECRET: process.env.COOKIE_SECRET,
    AGENDA: agenda
}