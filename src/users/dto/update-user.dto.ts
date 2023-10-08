import { IsEmail, IsNotEmpty } from 'class-validator';
import { Transform, Expose, Exclude } from 'class-transformer';

export class UpdateUserDto {
    @IsNotEmpty()
    @IsEmail()
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
        const birthDate = new Date(birthYear, 0, 15);  // Assuming January 1st as the default birth date
        return birthDate.toISOString().split('T')[0];
    })
    @Expose()
    birthDate: string;
}