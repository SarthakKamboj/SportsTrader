import { Field, ObjectType } from 'type-graphql';
import { ErrorType } from '../../util/types'
import { AccountType } from '../entity/accountTypes';

@ObjectType()
export class UserResponse {
    @Field(() => [ErrorType])
    errors?: ErrorType[];
    
    @Field(() => AccountType)
    account?: AccountType;
}