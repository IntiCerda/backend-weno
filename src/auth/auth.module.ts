import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../users/user.module';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'process';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret : env.SECRET,
      signOptions: {expiresIn: '1d' }
    })

  ],
  providers: [AuthService,AuthResolver],
   

})
export class AuthModule {}
