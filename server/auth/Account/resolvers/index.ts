import { Int, Arg, Field, Ctx, InputType, Query, Resolver, Mutation } from 'type-graphql';
import { AccountType } from '../entity/accountTypes';
import { UserResponse, LoginCredentials } from './types';
import { ErrorType } from '../../util/types';
import * as cases from '../use-cases';

@InputType()
class GQLAccountInput {
    @Field()
    firstName: string;

    @Field()
    lastName: string;

    @Field()
    userName: string;

    @Field(() => String)
    email: string;

    @Field()
    number: string;

    @Field()
    password: string;;
}

@Resolver()
export class UserResolver {
    @Query(() => UserResponse)
    async getAll(): Promise<UserResponse | null> {
        const userFeedback: Promise<UserResponse> = cases.getAccounts();
        return userFeedback;
    }

    @Query(() => UserResponse)
    async getOne(
        @Arg("id", () => Int) id: number,
    ): Promise<UserResponse | null> {
        const userFeedback: Promise<UserResponse> = cases.getAccount(id);
        return userFeedback;
    }
    

    @Query(() => UserResponse)
    async me(
        @Ctx() { req }
    ): Promise<UserResponse | null> {
        if (!req.session.accountId) {
            const error: ErrorType = {
                field: "redis id",
                message: "redis session id doesn't exist"
            } 

            return { error };
        }

        const userFeedback: Promise<UserResponse> = cases.getAccount(req.session.accountId);
        return userFeedback;
    }

    @Query(() => UserResponse)
    async login(
        @Arg("info", () => LoginCredentials) info: LoginCredentials, 
        @Ctx() { req }
    ): Promise<UserResponse | null> {
        const userFeedback: UserResponse = await cases.loginAccount(info);

        if (userFeedback['account'] === undefined) {
            const error: ErrorType = {
                field: "login",
                message: "account doesn't exist"
            }
            return { error }
        }

        req.session!.accountId = userFeedback['account']['id'];
        return userFeedback;
    }

    @Mutation(() => UserResponse)
    async addUser(
        @Arg("info", () => GQLAccountInput) info: GQLAccountInput,
        @Ctx() { req },
    ): Promise<UserResponse | null> {
        const info_ = info as AccountType;
        const userFeedback: UserResponse = await cases.makeAccount(info_);

        if (userFeedback['errors']) {
            return { errors: userFeedback['errors'] };
        } else if (userFeedback['error']) {
            return { error: userFeedback['error'] };
        }

        req.session!.accountId = userFeedback['account']['id'];

        return userFeedback;
    }

    @Mutation(() => UserResponse) 
    async deleteUser(
        @Arg("id", () => Int) id: number
    ): Promise<UserResponse> {
        const userFeedback: UserResponse = cases.deleteAccount(id);
        return userFeedback;
    } 

    // _______________________________________________________________
    // @Mutation(() => UserResponse)
    // async updateUser(@Arg("info", () => AccountType) options: AccountType): Promise<UserResponse> {
    //     const userFeedback: ErrorType = cases.updateAccount(options);
    //     return {
    //         error: userFeedback
    //     }
    // }
}