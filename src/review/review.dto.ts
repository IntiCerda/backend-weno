import { Field, Float, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ReviewObject {
    
    @Field(() => String)
    id: string;

    @Field(() => String)
    comment: string;

    @Field(() => Float)
    qualification: number;
}