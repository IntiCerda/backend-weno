import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserTest } from './userTest.dto';
import { UserTestService } from './userTest.service'; 

@Resolver(() => UserTest)
export class UserTestResolver {
  constructor(private readonly userService: UserTestService) {}

  @Query(() => [UserTest])
  async users() {
    return this.userService.findAll();
  }
  
}