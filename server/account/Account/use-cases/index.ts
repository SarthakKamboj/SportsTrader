import makeCreateAccount from './createAccount';
import makeGetAccounts from './getAllAccounts';
import makeGetOneAccount from './getOneAccount';
// import makeUpdateAccount from './updateAccount';
import makeDeleteAccount from './deleteAccount';
import makeLoginAccount from './loginAccount';
import { pool } from '../../db'

export const makeAccount = makeCreateAccount(pool);
export const getAccounts = makeGetAccounts(pool);
export const getAccount = makeGetOneAccount(pool);
// export const updateAccount = makeUpdateAccount(pool);
export const deleteAccount = makeDeleteAccount(pool);
export const loginAccount = makeLoginAccount(pool);

