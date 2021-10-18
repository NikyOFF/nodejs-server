import config from "../config";
import bcryptjs from "bcryptjs";

export default {
    hashSync(stringToHash: string): string {
        return bcryptjs.hashSync(`${stringToHash}${config.BCRYPT_SECRET}`, bcryptjs.genSaltSync());
    },
    compareSync(stringToHash: string, hash: string): boolean {
        return bcryptjs.compareSync(`${stringToHash}${config.BCRYPT_SECRET}`, hash);
    }
}