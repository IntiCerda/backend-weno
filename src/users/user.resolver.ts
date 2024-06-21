import { Body, Injectable, Param } from '@nestjs/common';
import { User } from './create-user.dto';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { RegisterDto } from 'src/auth/register.dto'; 


@Resolver(of => User)
export class UserResolver {
    constructor(private readonly userService: UserService){}

    @Query(returns => [User])
    async getAllUsers(){
        return this.userService.getAllUsers()
    }

    @Query(returns => User)
    async getUserById(@Args('id') id: string){
        return this.userService.getUserById(id)
    }

    @Mutation(() => User)
    async deleteUserByName(@Args('id') id: string){
        return this.userService.deleteUserById(id)
    }

    @Mutation(() => User)
    async updateUserByName(@Param('id') id: string,@Body() data: User){
        return this.userService.updateUser(id,data)
    }

}

