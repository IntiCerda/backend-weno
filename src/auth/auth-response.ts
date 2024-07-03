import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class AuthResponse {
  constructor(token: string, id: string) {
    this.token = token;
    this.id = id;
  }

  @Field()
  token: string;

  @Field()
  id: string;
}
