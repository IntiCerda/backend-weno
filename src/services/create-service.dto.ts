import { Field, Float, InputType } from '@nestjs/graphql';
import { IsString, MinLength, IsOptional, IsNumber } from 'class-validator';

@InputType()
export class CreateServiceDto {

  @Field()
  @IsString()
  @MinLength(1)
  name: string;

  @IsNumber()
  @Field(() => Float)
  price: number;

  @IsString()
  @Field()
  description: string;

  @Field()
  @IsString()
  id_user: string;

  @Field()
  @IsString()
  //@IsOptional() // Considera si es opcional o no
  category_name: string;
}