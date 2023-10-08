import { Exclude, Expose } from 'class-transformer';
import { User } from '../entities/user.entity';

export class UserDTO {
    constructor(user: User) {
        this.id = user.id;
        this.fullName = `${user.firstName} ${user.lastName}`;
        this.age = new Date().getFullYear() - new Date(user.birthDay).getFullYear();
        this.email = user.email;
    }

    @Expose()
    id: string;

    @Expose()
    fullName: string;

    @Expose()
    age: Number;

    @Expose()
    email: string;

    @Exclude({ toPlainOnly: true })
    password: string;
}
