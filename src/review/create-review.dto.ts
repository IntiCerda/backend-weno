import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class ReviewObject {
    
    @Field(() => String)
    comment: string;

    @Field(() => Int)
    qualification: number;
}