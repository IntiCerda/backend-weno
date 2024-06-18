import { Module } from '@nestjs/common';
import { ServiceService } from '../services/service.service';
import { ServiceController } from '../services/service.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ServiceController],
  providers: [ServiceService],
})
export class ServiceModule {}
