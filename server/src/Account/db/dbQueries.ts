import { DbQueryType } from '../../db/dbTypes'

export const getAllQuery  = (): DbQueryType => {
    return {
        query: "SELECT * FROM account;"
    }
}

export const getOneQuery  = (): DbQueryType => {
    return {
        query: "SELECT * FROM account WHERE username = ($1);"
    }
}

export const insertQuery = (): DbQueryType  => {
    return {
        query: `INSERT INTO account (firstname, lastname, username, email, number, password, createdat, updatedat) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;`,
    } 
}


export const delQuery  = (): DbQueryType => {
    return {
        query: `DELETE FROM account WHERE username = ($1);`
    } 
}

// export const updateQuery  = (): DbQueryType => {
//     return {
//         query: `update account set ($2, $3, $4, $5, $6) where id = ($1)`,
//     } 
// }