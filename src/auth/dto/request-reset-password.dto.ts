import { Field, InputType } from "@nestjs/graphql";
import { Transform } from "class-transformer";
import { IsEmail,IsNotEmpty, Matches,  } from "class-validator";


@InputType()
export class RequestResetPasswordDto {
  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())  //Elimina espacios en blanco
  @Matches(/^[^\u00C0-\u017F]+$/, { message: 'El correo no debe contener tildes' })
  @Field()
  email: string;

}