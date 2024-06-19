import { Module } from '@nestjs/common';
import { ServicesService } from './service.service'; 
import { PrismaModule } from 'src/prisma/prisma.module';
import { ServiceResolver } from './services.resolver';

@Module({
  imports: [PrismaModule],

  providers: [ServicesService, ServiceResolver],
})
export class ServiceModule {}
