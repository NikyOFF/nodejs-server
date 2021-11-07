import {model, Schema} from "mongoose";
import {EUserRole} from "@/enums/EUserRole";

export const userSchema = new Schema({
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: EUserRole[EUserRole.USER]
    }
});

export const userModel: Models.UserModel = model<Models.UserDocument>('user', userSchema);
