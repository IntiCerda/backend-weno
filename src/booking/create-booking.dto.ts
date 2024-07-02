import { Field, ID, InputType } from "@nestjs/graphql";
import { IsString, MinLength } from "class-validator";

@InputType()
export class CreateBooking {

    @Field()
    @IsString()
    id_user: string;

    @Field()
    @IsString()
    id_service: string;


    @Field()
    @IsString()
    date: string;
 
    @Field()
    @IsString()
    hour: string;

}