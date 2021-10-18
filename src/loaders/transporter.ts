import config from "../config";
import { createTransport, Transporter } from "nodemailer";

const transporter: Transporter = createTransport({
    service: config.mail.service,
    auth: {
        user: config.mail.login,
        pass: config.mail.password
    }
});

export default transporter;