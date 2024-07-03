import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class AuthResponse {
  constructor(token: string, email: string, userId: string) {
    this.token = token;
    this.email = email;
    this.userId = userId;
  }

  @Field()
  token: string;

  @Field()
  email: string;

  @Field()
  userId: string;
}
