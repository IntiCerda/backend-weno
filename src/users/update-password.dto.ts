import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

@InputType()
export class UpdatePasswordDto {

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
  newPassword: string;
}