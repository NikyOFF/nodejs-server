import {Entity, ObjectIdColumn, ObjectID, Column} from "typeorm";
import {EUserRole, UserRole} from "@/enums/EUserRole";

@Entity()
export class User {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    login: string;

    @Column()
    password: string;

    @Column()
    role: UserRole = "USER";

}
