import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ReviewObject {
    
    @Field(() => String)
    id: string;

    @Field(() => String)
    comment: string;

    @Field(() => Int)
    qualification: number;
}