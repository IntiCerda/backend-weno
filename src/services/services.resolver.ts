import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ServicesService } from './service.service';
import { Service } from './service.dto';
import { CreateServiceDto } from './create-service.dto';
import { User } from 'src/users/create-user.dto';


@Resolver()
export class ServiceResolver {
    constructor(private readonly serviceService: ServicesService){}

    @Query(() => [Service])
    async getAllServices(){
        return this.serviceService.getAllServices()
    }

    @Query(() => Service)
    async getServiceById(@Args('id') id: string){
        return this.serviceService.getServiceById(id)
    }

    @Mutation(() => Service)
    async deleteServiceById(@Args('id') id: string){
        return this.serviceService.deleteServiceById(id)
    }

    @Mutation(() => Service)
    async createService(@Args('createService') createService: CreateServiceDto){
        console.log(createService)
        return this.serviceService.createService(createService)
    }

    @Query(() => Service)
    async getServicesByUser(@Args('id') userId: string){
        return this.serviceService.getServicesByUser(userId)
    }

    // @Mutation()
    // async updateUserByName(@Param('id') id: string,@Body() data: User){
    //     return this.serviceSerice.updateService(id,data)
    // }

}

