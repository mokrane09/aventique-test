import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
    ValidationOptions,
    registerDecorator,
} from 'class-validator';
import { UsersRepository } from '../users.repository';

@ValidatorConstraint({ async: true })
export class UniqueEmailConstraint implements ValidatorConstraintInterface {
    async validate(email: string): Promise<boolean> {
        const user = new UsersRepository().findOneByEmail(email)
        return !user;
    }

    defaultMessage(args: ValidationArguments): string {
        return 'Email ($value) is already in use.';
    }
}

export function UniqueEmail(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: UniqueEmailConstraint,
        });
    };
}