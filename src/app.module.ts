import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserService } from './users/user.service'; 
import { UserModule } from './users/user.module';
import { ServiceModule } from './modules/service.module';
import { AuthModule } from './auth/auth.module';
import { GraphqlModule } from './graphql/graphql.module';
import { UserTest } from './userTest/userTest.dto';
import { UserTestModule } from './userTest/userTest.module';


@Module({
  imports: [PrismaModule, UserModule, ServiceModule, AuthModule, GraphqlModule, UserTestModule],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule {}
