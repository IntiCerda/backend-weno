import { Field, ObjectType } from "@nestjs/graphql";
import { Transform } from "class-transformer"
import { IsEmail, IsString, MinLength } from "class-validator"

@ObjectType()
export class RegisterDto{

    @Field()
    @IsString()
    @MinLength(1)
    name : string;

    @Field()
    @IsString()
    @MinLength(1)
    lastName : string;

    @Field()
    @IsEmail()
    email : string;

    
    @Field()
    @Transform(({value})=> value.trim())
    @IsString()
    @MinLength(6)
    password : string;
    
}