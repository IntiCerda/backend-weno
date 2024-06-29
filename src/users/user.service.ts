import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from 'src/auth/dto/register.dto'; 
import { UpdatePasswordDto } from './update-password.dto';
import * as bcryptjs  from 'bcryptjs'
import { UpdateEmailDto } from './update-email.dto';
import {User} from './create-user.dto';

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
        const { name, lastName, email, password1, password2 } = registerDto;
        return await this.prisma.user.create({
            data: {
                name,
                lastName,
                email,
                password: password1,
            },
        });
    }

    async updatePassByEmail(updatePassDto: UpdatePasswordDto ): Promise<User>{
        const { email, newPassword } = updatePassDto;

        const userFind = await this.getUserByEmail(email);
        if(!userFind){
            throw new UnauthorizedException('User not found');
        }
        
        const isPasswordValid = await bcryptjs.compare(newPassword, userFind.password);
        if(isPasswordValid){
            throw new UnauthorizedException('The password is the same');
        }
        
        const password = await bcryptjs.hash(newPassword, 10);
        return await this.prisma.user.update({
            where:{
                email
            },
            data:{
                password
            }
        })

    }

    async deleteUserById(id: string): Promise<User>{
        return await this.prisma.user.delete({
            where:{
                id
            }
        })
    }

    async getUserByEmail(email : string): Promise<User>{
        return this.prisma.user.findUnique({
            where:{
                email
            }
        })
    }

    async updateEmailById(updateEmailDto: UpdateEmailDto): Promise<User>{
        const {id,newEmail } = updateEmailDto;
        const userFound = await this.getUserById(id);

        if(!userFound){
            throw new UnauthorizedException('User not found');
        } 

        return await this.prisma.user.update({
            where:{
                id
            },
            data:{
                email: newEmail
            }
        })
    }


}
