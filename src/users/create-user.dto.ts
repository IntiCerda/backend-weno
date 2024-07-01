import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsString, MinLength } from 'class-validator';

@ObjectType()
export class User {

  @Field(() => ID)
  id: string;

  @Field()
  @IsString()
  @MinLength(1)
  name: string;

  @Field()
  @IsString()
  @MinLength(6)
  lastName: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  @MinLength(6)
  password: string;

  @Field({ nullable: true }) 
  @IsString()
  address?: string;

  @Field({ nullable: true }) 
  @IsString()
  nationality?: string;
}
