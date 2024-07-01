import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class AuthResponse {
  constructor(token: string, email: string) {
    this.token = token;
    this.email = email;
  }

  @Field()
  token: string;

  @Field()
  email: string;
}
