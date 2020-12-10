import { buildMakeAccount } from './account';
import { isValidEmail, isValidNumber, buildMakeHashPassword } from './utils';
import bcrypt from 'bcrypt';

const hashPassword: (pw: string) => any = buildMakeHashPassword({ bcrypt })
const makeAccount = buildMakeAccount({ isValidNumber, isValidEmail, hashPassword });
export default makeAccount;
