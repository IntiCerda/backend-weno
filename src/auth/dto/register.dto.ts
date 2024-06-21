import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { Transform } from "class-transformer"
import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from "class-validator"

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
    @Matches(/^[^\u00C0-\u017F]+$/, { message: 'El correo no debe contener tildes' })
    @IsNotEmpty()
    @Field()
    email : string;


    @Transform(({value})=> value.trim())
    @IsString()
    @MinLength(6)
    @IsNotEmpty()  @Matches(/[A-Z]/, { message: 'La contraseña debe contener al menos una letra mayúscula' })
    @Matches(/^[^\u00C0-\u017F\s]+$/,{ message: 'La contraseña no debe contener tildes' })
    @Field()
    password : string;
    
}