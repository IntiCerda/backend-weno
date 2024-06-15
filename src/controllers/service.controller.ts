import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ServiceService } from 'src/services/service.service'; 
import { CreateServiceDto } from 'src/dto/create-service.dto'; 
import { UpdateServiceDto } from 'src/dto/update-service.dto'; 
import { Services, User } from '@prisma/client';

@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post()
  createService(@Body() @Body() data: Services) {
    return this.serviceService.createService(data);
  }

  @Get()
  getAllServices() {
    return this.serviceService.getAllServices();
  }

  @Get(':id')
  getServiceById(@Param('id') id: string) {
    return this.serviceService.getServiceById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Services) {
    return this.serviceService.updateService(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviceService.deleteServiceById(id);
  }
}
