import makeAccount from '../entity';
import { AccountType } from '../entity/accountTypes'
import { insertQuery } from '../db/dbQueries';
import { pgQuery } from '../db/poolQueryBase';
import UseCaseType from './useCaseType';
import { Pool } from 'pg'
import { UserResponse } from '../resolvers/types';

export default function makeCreateAccount ( pool: Pool ) {
    return async function createAccount( accountInfo: AccountType ): Promise<UserResponse> {
        const account = makeAccount(accountInfo);
        
        if (account['errors']) {
            return {
                errors: account['errors'],
            }
        }

        const inputs: UseCaseType = {
            pool,
            query: insertQuery()['query'],
        }

        let info = {
            firstName: account['account']?.firstName,
            lastName: account['account']?.lastName,
            userName: account['account']?.userName,
            email: account['account']?.email,
            number: account['account']?.number,
            password: account['account']?.password,
        }

        const res = await pgQuery(inputs, info);
        
        if (res["error"]) {
            return {
                error: {
                    field: "create account",
                    message: res["error"]
                }
            }
        }

        const acc = res['response'].rows[0];

        const account_: AccountType = {
            id: acc['id'],
            firstName: acc['firstname'],
            lastName: acc['lastname'],
            userName: acc['username'],
            email: acc['email'],
            number: acc['number'],
            createdAt: acc['createdat'],
            updatedAt: acc['updatedat']
        } as AccountType;

        // console.log(account_);

        return {
            account: account_,
            response: "account created"
        }
    }
}