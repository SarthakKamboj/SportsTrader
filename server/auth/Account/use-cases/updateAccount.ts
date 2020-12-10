// import { updateQuery } from '../db/dbQueries';
// import { pgQuery } from '../db/poolQueryBase';
// import UseCaseType from './useCaseType';
// import { Pool } from 'pg'
// import { UserResponse } from '../resolvers/types';

// export default function makeUpdateAccount ( pool: Pool) {
//     return function updateAccount( info: any ): UserResponse {
//         // handle for account doesn't exist - TODO

//         const inputs: UseCaseType = {
//             pool,
//             query: updateQuery()['query'],
//         }

//         pgQuery(inputs, info);

//         return {
//            response: "account updated"
//         }; 
//     }
// }