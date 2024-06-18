import { IsEmail,IsNotEmpty,IsString, MinLength } from "class-validator"
import { Transform } from "class-transformer"
import { Field, InputType, ObjectType } from "@nestjs/graphql"

@InputType()
export class LoginDto{

    @Field()
    @IsEmail()
    @IsNotEmpty()
    email: string

    @Field()
    @Transform(({value})=> value.trim())
    @IsString()
    @MinLength(6)
    @IsNotEmpty()
    password: string
}