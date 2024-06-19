import { Field, Float, ID, InputType, ObjectType } from '@nestjs/graphql';
import { IsString, MinLength } from 'class-validator';


@InputType()
export class CreateServiceDto {

  @Field()
  @IsString()
  @MinLength(1)
  name: string;

  
  @Field(() => Float)
  price: number;

  @IsString()
  @Field()
  description: string;

  @Field()
  userId: string;
  
  @Field()
  categoryName: string

}