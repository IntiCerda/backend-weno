import { IsEmail,IsNotEmpty,IsString, Matches, MinLength } from "class-validator"
import { Transform } from "class-transformer"
import { Field, InputType } from "@nestjs/graphql"

@InputType()
export class LoginDto{

    @IsEmail()
    @IsNotEmpty()
    @Matches(/^[^\u00C0-\u017F]+$/, { message: 'El correo no debe contener tildes' })
    @Field(() =>String)
    email: string;


    @Transform(({value})=> value.trim())
    @IsString()
    @MinLength(6)
    @IsNotEmpty()  @Matches(/[A-Z]/, { message: 'La contraseña debe contener al menos una letra mayúscula' })
    @Matches(/^[^\u00C0-\u017F\s]+$/,{ message: 'La contraseña no debe contener tildes' })
    @Field(() =>String)
    password: string;
}