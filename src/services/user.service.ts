import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { RegisterDto } from 'src/dto/register.dto';

@Injectable()
export class UserService {

    constructor(private prisma: PrismaService){}

    async getAllUsers(): Promise<User[]>{
        return this.prisma.user.findMany();
    }


    async getUserById(id: string): Promise<User>{
        return this.prisma.user.findUnique({
            where: {
                id
            }
        })
    }

    async createUser(registerDto: RegisterDto): Promise<User> {
        const { name, lastName, email, password } = registerDto;
        return this.prisma.user.create({
            data: {
                name,
                lastName,
                email,
                password,
            },
        });
    }

    async updateUser(id:string,data: User ): Promise<User>{
        return this.prisma.user.update({
            where:{
                id
            },
            data
        })
    }

    async deleteUserById(id: string): Promise<User>{
        return this.prisma.user.delete({
            where:{
                id
            }
        })
    }

    async getUserByEmail(email : string){
        return this.prisma.user.findUnique({
            where:{
                email
            }
        })
    }
}
