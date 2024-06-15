import { Module } from '@nestjs/common';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';
import { UserModule } from './user.module';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'process';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret : env.SECRET,
      signOptions: {expiresIn: '1d' }
    })


  ],
  controllers: [AuthController],
  providers: [AuthService],
  

})
export class AuthModule {}
