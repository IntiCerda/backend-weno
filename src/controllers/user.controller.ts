import { Body, Controller, Get, Inject, Post ,Param, Delete, Put} from "@nestjs/common";
import { UserService } from "../services/user.service";
import { CreateUserDto } from "src/dto/create-user.dto";
import { get } from "http";
import { User } from "@prisma/client";
import { register } from "module";
import { RegisterDto } from "src/dto/register.dto";


@Controller('user')
export class UserController{
    constructor(private readonly userService: UserService){}

    @Get()
    async getAllUsers(){
        return this.userService.getAllUsers()
    }

    @Post()
    async createUser(@Body() registerDto: RegisterDto){
        return this.userService.createUser(registerDto)
    }

    @Get(':id')
    async getUserById(@Param('id') id: string){
        return this.userService.getUserById(id)
    }

    @Delete(':id')
    async deleteUserByName(@Param('id') id: string){
        return this.userService.deleteUserById(id)
    }
        
    @Put(':id')
    async updateUserByName(@Param('id') id: string, @Body() data: User){
        return this.userService.updateUser(id,data)
    }


}