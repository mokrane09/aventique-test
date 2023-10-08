export class User {

    constructor(id: string, firstName: string, lastName: string, birthDay: Date, email: string, password: string) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDay = birthDay;
        this.email = email;
        this.password = password;
    }

    id: string;
    firstName: string;
    lastName: string;
    birthDay: Date;
    email: string;
    password: string;
}
