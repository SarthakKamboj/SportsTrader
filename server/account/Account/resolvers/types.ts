import { Field, ObjectType, InputType } from 'type-graphql';
import { ErrorType } from '../../util/types'
import { AccountType } from '../entity/accountTypes';

@ObjectType()
export class UserResponse {
    @Field(() => [ErrorType], { nullable: true })
    errors?: ErrorType[];

    @Field(() => ErrorType, { nullable: true })
    error?: ErrorType;
    
    @Field(() => AccountType, { nullable: true })
    account?: AccountType;
    
    @Field(() => [AccountType], { nullable: true })
    accounts?: AccountType[];

    @Field(() => String, { nullable: true })
    response?: string;
}

@InputType()
export class LoginCredentials {
    @Field(() => String)
    username: string

    @Field(() => String)
    password: string
}