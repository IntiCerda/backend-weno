import { Field, InputType } from "@nestjs/graphql";
import { IsString } from "class-validator";


@InputType()
export class CreateBookingInput {
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
    time: string;
}
