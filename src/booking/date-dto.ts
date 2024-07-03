import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class SelectDate {
    @Field()
    @IsString()
    date: string;

    @Field()
    @IsString()
    time: string;
}
