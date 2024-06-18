import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { Transform } from "class-transformer"
import { IsEmail, IsString, MinLength } from "class-validator"

@InputType()
export class RegisterDto{

    @IsString()
    @MinLength(1)
    @Field()
    name : string;

    @IsString()
    @MinLength(1)
    @Field()
    lastName : string;

    @IsEmail()
    @Field()
    email : string;


    @Transform(({value})=> value.trim())
    @IsString()
    @MinLength(6)
    @Field()
    password : string;
    
}