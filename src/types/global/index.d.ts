import {Document, Model} from "mongoose"
import {IUser} from "@/interfaces/IUser";

declare global {
    namespace Express {
        interface Request {
            ignoreCsrf: boolean | undefined;
            errorRedirect: string;
        }
    }

    namespace Models {
        type ModelInstance = { name: string, model: Model<any> }

        type UserDocument = IUser & Document;
        type UserModel = Model<UserDocument>;
    }
}