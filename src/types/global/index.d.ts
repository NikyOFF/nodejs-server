import {Document, Model} from "mongoose"

declare global {
    namespace Express {
        interface Request {
            ignoreCsrf: boolean | undefined;
            errorRedirect: string;
        }
    }
}