import { getOneQuery } from '../db/dbQueries';
import { pgQuery } from '../db/poolQueryBase';
import UseCaseType from './useCaseType';
import { Pool } from 'pg'
import { UserResponse } from '../resolvers/types';
import { AccountType } from '../entity/accountTypes';

export default function makeGetOneAccount ( pool: Pool ) {
    return async function getOneAccount ( id: number ): Promise<UserResponse> {
        const inputs: UseCaseType = {
            pool,
            query: getOneQuery()['query'],
        }

        const info: AccountType = {
            id,
        } as AccountType;

        const res = await pgQuery(inputs, info);
        let acc = res['response'].rows[0];
        let account: AccountType | null = null;
        let response = "account doesn't exist";

        if (acc !== undefined) {
            account = {
                id: acc['id'],
                firstName: acc['firstname'],
                lastName: acc['lastname'],
                userName: acc['username'],
                email: acc['email'],
                number: acc['number'],
                createdAt: acc['createdat'],
                updatedAt: acc['updatedat']
            } as AccountType;
            response = "account returned";
        }

        return {
            account,
            response
        }
    }
}