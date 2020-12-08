import { Field, ObjectType, Int } from 'type-graphql';
import { ErrorType } from '../../util/types';

@ObjectType()
export class AccountType {
    @Field(() => Int, { nullable: true })
    id?: number

    @Field(() => String, {nullable: true})
    firstName: string;

    @Field(() => String, {nullable: true})
    lastName: string;

    @Field(() => String, {nullable: true})
    userName: string;

    @Field(() => String, {nullable: true})
    email: string;

    @Field(() => String, {nullable: true})
    number: string;

    password: string;
    
    @Field(() => String, {nullable:true})
    createdAt: string;
    
    @Field(() => String, {nullable:true}) 
    updatedAt: string;
}

@ObjectType()
export class AccountResType {
    @Field(() => [ErrorType], {nullable: true})
    errors?: ErrorType[];

    @Field(() => AccountType, {nullable: true})
    account?: AccountType
}
