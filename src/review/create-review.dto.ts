import { Field, Float, InputType, Int } from "@nestjs/graphql";
import { IsNumber, IsString, MinLength } from "class-validator";

@InputType()
export class ReviewInput {
    
    @Field()
    @IsString()
    @MinLength(1)
    comment: string;

    @Field(() => Float)
    @IsNumber()
    qualification: number;
}