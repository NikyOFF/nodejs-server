import dotenv from "dotenv";

const configOutput = dotenv.config();

if (configOutput.error) {
    throw new Error();
}

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

export default {
    NODE_ENV: process.env.NODE_ENV,
    LOG_LEVEL: process.env.LOG_LEVEL,
    SERVER_PORT: parseInt(process.env.SERVER_PORT, 10),
    SERVER_HOSTNAME: process.env.SERVER_HOSTNAME,
    DATABASE_URI: process.env.DATABASE_URI,
    API_PREFIX: process.env.API_PREFIX,
    BCRYPT_SECRET: process.env.BCRYPT_SECRET,
    JWT_SECRET: process.env.JWT_SECRET,
    mail: {
        service: process.env.MAIL_SERVICE,
        login: process.env.MAIL_LOGIN,
        password: process.env.MAIL_PASSWORD
    }
}