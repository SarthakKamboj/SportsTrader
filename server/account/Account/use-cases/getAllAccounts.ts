import { getAllQuery } from '../db/dbQueries';
import { pgQuery } from '../db/poolQueryBase';
import UseCaseType from './useCaseType';
import { Pool } from 'pg'
import { UserResponse } from '../resolvers/types';
import { AccountType } from '../entity/accountTypes';

export default function makeGetAccounts ( pool: Pool ) {
    return async function getAccounts (): Promise<UserResponse> {
        const inputs: UseCaseType = {
            pool,
            query: getAllQuery()['query'],
        }

        const res = await pgQuery(inputs);

        const accounts_: AccountType[] = []

        for (let i = 0; i < res['response'].rows.length; i++) {

            let acc = res['response'].rows[i];
            accounts_.push({
                id: acc['id'],
                firstName: acc['firstname'],
                lastName: acc['lastname'],
                userName: acc['username'],
                email: acc['email'],
                number: acc['number'],
                createdAt: acc['createdat'],
                updatedAt: acc['updatedat']
            } as AccountType)
        }

        return {
            accounts: accounts_,
            response: "all accounts returned"
        }
    }
}