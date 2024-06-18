import { IsEmail,IsNotEmpty,IsString, MinLength } from "class-validator"
import { Transform } from "class-transformer"
import { Field, InputType } from "@nestjs/graphql"

@InputType()
export class LoginDto{

    @IsEmail()
    @IsNotEmpty()
    @Field(() =>String)
    email: string;


    @Transform(({value})=> value.trim())
    @IsString()
    @MinLength(6)
    @IsNotEmpty()
    @Field(() =>String)
    password: string;
}