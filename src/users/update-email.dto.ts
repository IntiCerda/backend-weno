import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

@InputType()
export class UpdateEmailDto {
    
    @IsEmail()
    @Matches(/^[^\u00C0-\u017F]+$/, { message: 'El correo no debe contener tildes' })
    @IsNotEmpty()
    @Field()
    newEmail: string;

    @Field()
    @IsString()
    id: string;
}