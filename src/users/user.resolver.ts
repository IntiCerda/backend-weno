import { Body, Injectable, Param } from '@nestjs/common';
import { User } from './create-user.dto';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { RegisterDto } from 'src/auth/dto/register.dto'; 
import { UpdatePasswordDto } from './update-password.dto';
import { UpdateEmailDto } from './update-email.dto';


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
    async updatePassByEmail(@Args('updatePassDto') updatePassDto: UpdatePasswordDto){
        return this.userService.updatePassByEmail(updatePassDto)
    }

    @Mutation(() => User)
    async updateEmailById(@Args('updateEmailDto') updateEmailDto : UpdateEmailDto){
        return this.userService.updateEmailById(updateEmailDto) 
    }

    @Mutation(() => User)
    async updateAddressById(@Args('id') id: string, @Args('address') address: string){
        return this.userService.updateAddressById(id, address)
    }

    @Mutation(() => User)
    async updateNationalityById(@Args('id') id: string, @Args('nationality') nationality: string){
        return this.userService.updateNationalityById(id, nationality)
    }

}

