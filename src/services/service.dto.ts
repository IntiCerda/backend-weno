import { Field, Float, ID, InputType, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { CategoryObject } from 'src/category/category.dto';
import { User } from 'src/users/create-user.dto';

@ObjectType()
export class Service {

  @Field(() => ID)
  id: string;

  @Field()
  @IsString()
  @MinLength(1)
  name: string;

  @Field(() => Float)
  price: number;

  @IsString()
  @Field()
  description: string;

  @Field(() => User)
  user: User;
  
  @Field()
  category: CategoryObject

}