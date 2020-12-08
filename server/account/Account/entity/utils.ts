import { ValidatorType } from '../../util/types';

export const isValidNumber = (num: string): ValidatorType => {
   if (num.trim().length < 10) {
    return {
        valid: false,
    }
   }
   return {
       valid: true,
   }
}

export const isValidEmail = (email: string): ValidatorType => {
    const validDomains: string[] = [
        ".com",
        ".org",
        ".cc`"
    ]

    if (!email.includes("@")) {
        return {
            valid: false,
        }
    }

    let isDomain: boolean = false;
    for (let i = 0; i < validDomains.length; i++) {
       if (email.includes(validDomains[i])) {
            return {
                valid: true,
            }
       }
    }

    return {
        valid: isDomain,
    }
}

export function buildMakeHashPassword ({ bcrypt }) {
    return function hashPassword (pw: string ): any {
        const saltRounds = 10;

        bcrypt.genSalt(saltRounds, function(_err: any, salt: any) {
            bcrypt.hash(pw, salt, function(_err: any, hash: any) {
                return hash;
            })
        })
    }
}