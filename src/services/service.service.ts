import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Services, User } from '@prisma/client';
import { CreateServiceDto } from './create-service.dto';
import { UserService } from 'src/users/user.service';
import { CategoryService } from 'src/category/category.service';

@Injectable()
export class ServicesService {
  constructor(
    private prisma: PrismaService, 
    private userService: UserService,
    private categoryService: CategoryService
  ){}

  async getAllServices(): Promise<Services[]>{
      return this.prisma.services.findMany({
            include: {
                user: true,
                category: true
            }
      });
  }


  async getServiceById(id: string): Promise<Services>{
      return this.prisma.services.findUnique({
          where: {
              id
              
          }, include: {
                user: true,
                category: true
          }

      })
  }

  async createService(createService: CreateServiceDto): Promise<Services>{
        const {name, price, description, userId, categoryName} = createService;

        console.log('hola')
        const userFound = await this.userService.getUserById(createService.userId)

        if(!userFound) throw new NotFoundException('User not found');

        const categoryFound = await this.categoryService.getCategoryByName(createService.categoryName)

        if(!categoryFound) throw new NotFoundException('Category not found');
        console.log(categoryFound);

        return await this.prisma.services.create({
          data:{
                name,
                price,
                description,
                user: {
                    connect: {
                        id: userFound.id
                    }
                },
                category: {
                    connect: {
                        name: categoryFound.name
                    }
                }
          }
      })

  }

  async updateService(id:string,data: Services ): Promise<Services>{
      return this.prisma.services.update({
          where:{
              id
          },
          data
      })
  }

  async deleteServiceById(id: string): Promise<Services>{
      return this.prisma.services.delete({
          where:{
              id
          }
      })
  }
}
