import {Agenda} from "agenda/es";
import config from "@/config";

export default (): Agenda => {
    return new Agenda({
        db: {
            address: config.DATABASE_URI,
            collection: config.AGENDA_DATABASE_COLLECTION
        }
    });
}