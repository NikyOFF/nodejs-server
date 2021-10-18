import { model, Schema } from "mongoose";

export const userSchema = new Schema({
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    lastLogin: {
        type: Date,
        required: false,
        default: new Date()
    }
});

export const userModel: Models.UserModel = model<Models.UserDocument>('user', userSchema);
