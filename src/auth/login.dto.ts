import { IsEmail,IsString, MinLength } from "class-validator"
import { Transform } from "class-transformer"
import { Field, ObjectType } from "@nestjs/graphql"

@ObjectType()
export class LoginDto{

    @Field()
    @IsEmail()
    email: string

    @Field()
    @Transform(({value})=> value.trim())
    @IsString()
    @MinLength(6)
    password: string
}