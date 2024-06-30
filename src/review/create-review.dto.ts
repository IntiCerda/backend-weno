import { Field, Float, InputType, Int } from "@nestjs/graphql";

@InputType()
export class ReviewInput {
    
    @Field(() => String)
    comment: string;

    @Field(() => Float)
    qualification: number;
}