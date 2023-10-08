export class User {

    constructor(id: string, firstName: string, lastName: string, birthDate: string, email: string, password: string) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;
        this.email = email;
        this.password = password;
    }

    id: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    email: string;
    password: string;
}
