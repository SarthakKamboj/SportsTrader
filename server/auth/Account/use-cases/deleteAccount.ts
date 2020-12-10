import { delQuery } from '../db/dbQueries';
import { pgQuery } from '../db/poolQueryBase';
import UseCaseType from './useCaseType';
import { AccountType } from '../entity/accountTypes';
import { Pool } from 'pg';
import { UserResponse } from '../resolvers/types';

export default function makeDeleteAccount ( pool: Pool) {
    return function deleteAccount( id: number ): UserResponse {
        const inputs: UseCaseType = {
            pool,
            query: delQuery()['query'],
        }

        const info: AccountType = {
            id,
        } as AccountType;

        pgQuery(inputs, info);

        return {
           response: "account deleted"
        }
    }
}