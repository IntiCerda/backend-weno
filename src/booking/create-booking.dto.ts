import { Field, ID, InputType } from "@nestjs/graphql";
import { IsString, MinLength } from "class-validator";
import { SelectDate } from "./date-dto";

@InputType()
export class CreateBooking {

    @Field()
    @IsString()
    id_user: string;

    @Field()
    @IsString()
    id_service: string;

    @Field()
    selectdate: SelectDate;

}