import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserService } from './users/user.service'; 
import { UserModule } from './users/user.module';
import { ServiceModule } from './services/service.module'; 
import { AuthModule } from './auth/auth.module';
import { GraphqlModule } from './graphql/graphql.module';

import { PrismaService } from './prisma/prisma.service';
import { CategoryModule } from './category/category.module';
import { BookingModule } from './booking/booking.module';


@Module({
  imports: [PrismaModule, UserModule, 
    ServiceModule, AuthModule, 
    GraphqlModule, 
    CategoryModule,BookingModule],
  controllers: [AppController],
  providers: [AppService, UserService, PrismaService],
})
export class AppModule {}
