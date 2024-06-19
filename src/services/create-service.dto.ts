import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsString, MinLength } from 'class-validator';

@InputType()
export class CreateServiceDto {

  @Field(() => ID)
  id: string;

  @Field()
  @IsString()
  @MinLength(1)
  name: string;

  @Field()
  price: number;

}