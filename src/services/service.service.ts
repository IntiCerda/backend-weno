import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Services, User } from '@prisma/client';

@Injectable()
export class ServiceService {
  constructor(private prisma: PrismaService){}

  async getAllServices(): Promise<Services[]>{
      return this.prisma.services.findMany();
  }


  async getServiceById(id: string): Promise<Services>{
      return this.prisma.services.findUnique({
          where: {
              id
          }
      })
  }

  async createService(data: Services): Promise<Services>{
      return this.prisma.services.create({

          data
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
