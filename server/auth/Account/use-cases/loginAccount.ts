import { AccountType } from '../entity/accountTypes'
import { loginQuery } from '../db/dbQueries';
import { pgQuery } from '../db/poolQueryBase';
import UseCaseType from './useCaseType';
import { Pool } from 'pg'
import { UserResponse, LoginCredentials } from '../resolvers/types';

export default function makeLoginAccount ( pool: Pool ) {
    return async function loginAccount( creds: LoginCredentials ): Promise<UserResponse> {

        const inputs: UseCaseType = {
            pool,
            query: loginQuery()['query'],
        }

        let info: AccountType = {
            userName: creds['username'],
            password: creds['password'],

        } as AccountType;

        const res = await pgQuery(inputs, info);
        
        // if (res["error"]) {
        //     return {
        //         error: {
        //             field: "create account",
        //             message: res["error"]
        //         }
        //     }
        // }

        let account_ = undefined;
        if (res['response'].rows[0]) {

            const acc = res['response'].rows[0];

            account_ = {
                id: acc['id'],
                firstName: acc['firstname'],
                lastName: acc['lastname'],
                userName: acc['username'],
                email: acc['email'],
                number: acc['number'],
                createdAt: acc['createdat'],
                updatedAt: acc['updatedat']
            } as AccountType;
        }

        // console.log(account_);

        return {
            account: account_,
            response: "account created"
        }
    }
}