import { Field, ID, ObjectType } from "@nestjs/graphql";
import { IsString, MinLength } from "class-validator";
import { ReviewObject } from "src/review/review.dto";
import { Service } from "src/services/service.dto";
import { User } from "src/users/create-user.dto";

@ObjectType()
export class BookingObject {
    
    @Field(() => ID)
    id: string;
  
    @Field(() => User)
    user: User;

    @Field(() => Service)
    service: Service;

    @Field({nullable: true, defaultValue: null}) 
    review?: ReviewObject;

    
    @IsString()
    @Field()
    date: string;
 
    
    @IsString()
    @Field()
    hour: string;

}
