import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class ErrorType {
    @Field()
    field?: string;

    @Field()
    message: string
}

@ObjectType()
export class ValidatorType {
    @Field(() => Boolean)
    valid: boolean
}