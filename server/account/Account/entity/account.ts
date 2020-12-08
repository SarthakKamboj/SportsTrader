import { AccountType, AccountResType } from './accountTypes';
import { ValidatorType } from '../../util/types';
import { ErrorType } from '../../util/types';

export interface buildMakeAccountType {
    isValidNumber: (num: string) => ValidatorType;
    isValidEmail: (email: string) => ValidatorType;
    hashPassword: (pw: string) => any;
}

export function buildMakeAccount ({ isValidNumber, isValidEmail, hashPassword }: buildMakeAccountType) {
    return function makeAccount ({ firstName, lastName, userName, email, number, password, createdAt = Date.now(), updatedAt = Date.now() }: AccountType): AccountResType {
        const errors: ErrorType[] = [];
        
        if (!firstName) {
            const err: ErrorType = {
                field: "firstName",
                message: "Please enter a first name."
            }

            errors.push(err);
        }

        if (!lastName) {
            const err: ErrorType = {
                field: "lastName",
                message: "Please enter a last name."
            }

            errors.push(err);
        }

        if (!userName) {
            const err: ErrorType = {
                field: "userName",
                message: "Please enter a user name."
            }

            errors.push(err);
        }

        if (!number || !isValidNumber(number)["valid"]) {
            const err: ErrorType = {
                field: "number",
                message: "Please enter a valid number."
            }

            errors.push(err);
 
        }

        if (!email || !isValidEmail(email)["valid"]) {
            const err: ErrorType = {
                field: "email",
                message: "Please enter a valid email."
            }

            errors.push(err);

        }

        if (password.length < 3) {
            const err: ErrorType = {
                field: "password",
                message: "Password too short"
            }

            errors.push(err);

        }

        if (errors.length > 0) {
            return {
                errors,
            }
        }

        // const pw = hashPassword(password);

        const account = {
            firstName, lastName, userName, email, number, password, createdAt, updatedAt
        } as AccountType;

        return {
            account
        }

    }
}