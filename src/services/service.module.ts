import { Module } from '@nestjs/common';
import { ServicesService } from './service.service'; 
import { PrismaModule } from 'src/prisma/prisma.module';
import { ServiceResolver } from './services.resolver';
import { UserModule } from 'src/users/user.module';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports: [PrismaModule, UserModule, CategoryModule],
  providers: [ServicesService, ServiceResolver],
  exports: [ServicesService]
})
export class ServiceModule {}
