import { Field, ID, InputType } from "@nestjs/graphql";
import { IsString, MinLength } from "class-validator";

export type selectDate = {date: string, time: string}

@InputType()
export class CreateBooking {

    @Field()
    @IsString()
    id_user: string;

    @Field()
    @IsString()
    id_service: string;

    @Field() 
    selectdate: selectDate = { date: "", time: "" };

}