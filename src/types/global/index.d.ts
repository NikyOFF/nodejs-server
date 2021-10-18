import { IUser } from "@/interfaces/IUser";
import { Document, Model } from "mongoose"

declare global {
    namespace Models {
        type ModelInstance = { name: string, model: Model<any> }

        type UserDocument = IUser & Document;
        type UserModel = Model<UserDocument>;
    }
}