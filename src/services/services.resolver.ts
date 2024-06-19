import { Body, Injectable, Param } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { RegisterDto } from 'src/auth/register.dto'; 
import { UserService } from 'src/users/user.service';
import { ServicesService } from './service.service';


@Resolver()
export class ServiceResolver {
    constructor(private readonly serviceSerice: ServicesService){}

    @Query()
    async getAllServices(){
        return this.serviceSerice.getAllServices()
    }

    @Query()
    async getUserById(@Args('id') id: string){
        return this.serviceSerice.getServiceById(id)
    }

    @Mutation()
    async deleteUserByName(@Args('id') id: string){
        return this.serviceSerice.deleteServiceById(id)
    }

     

    // @Mutation()
    // async updateUserByName(@Param('id') id: string,@Body() data: User){
    //     return this.serviceSerice.updateService(id,data)
    // }

}

