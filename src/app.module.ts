import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserService } from './services/user.service'; 
import { UserModule } from './modules/user.module';
import { ServiceModule } from './modules/service.module';
import { AuthModule } from './modules/auth.module';


@Module({
  imports: [PrismaModule, UserModule, ServiceModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule {}
