import { IsEmail, IsNotEmpty, Validate } from 'class-validator';
import { Transform, Expose, Exclude } from 'class-transformer';
import { UniqueEmail } from '../validators/unique-email.validator';

export class CreateUserDto {
    @IsNotEmpty()
    @IsEmail()
    @UniqueEmail()
    email: string;

    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    @Exclude()
    age: number;

    @IsNotEmpty()
    password: string;

    @Transform(( object ) => {
        const currentYear = new Date().getFullYear();
        const birthYear = currentYear - object.obj.age;
        const birthDate = new Date(birthYear, 0, 1);  // Assuming January 1st as the default birth date
        return birthDate.toISOString().split('T')[0];
    })
    @Expose()
    birthDate: string;
}