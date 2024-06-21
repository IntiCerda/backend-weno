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
      return await this.prisma.services.findMany({
            include: {
                user: true,
                category: true
            }
      });
  }


  async getServiceById(id: string): Promise<Services>{
      return await this.prisma.services.findUnique({
          where: {
              id
              
          }, include: {
                user: true,
                category: true
          }

      })
  }

  async createService(createService: CreateServiceDto): Promise<Services>{
        const {name, price, description, id_user, category_name} = createService;

        const userFound = await this.userService.getUserById(id_user)

        if(!userFound) throw new NotFoundException('User not found');

        const categoryFound = await this.categoryService.getCategoryByName(category_name)

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
      return await this.prisma.services.update({
          where:{
              id
          },
          data
      })
  }

  async deleteServiceById(id: string): Promise<Services>{
      return await this.prisma.services.delete({
          where:{
              id
          }
      })
  }

    async getServicesByUser(userId: string): Promise<Services[]>{ 
        const userFIind = await this.userService.getUserById(userId)
        if(!userFIind) throw new NotFoundException('User not found');
        const services = await this.prisma.services.findMany({
            where:{
                id_user: userFIind.id
            },
            include: {
                user: true,
                category: true
            }
            
        })
        console.log(services)
        return services;
    }

    async getServicesNotUser(userId: string): Promise<Services[]>{ 
        const userFIind = await this.userService.getUserById(userId)
        if(!userFIind) throw new NotFoundException('User not found');
        //quiero todos los servicios excepto los del usuario
        const services = await this.prisma.services.findMany({
            where:{
                NOT:{
                    id_user: userFIind.id
                }
            },
            include: {
                user: true,
                category: true
            }
            
        })

        console.log(services)
        return services;
    }
}
