import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto'; 
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthResponse } from './dto/auth-response'; 
import { User } from 'src/users/create-user.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './guard/auth.guard';
import { RequestResetPasswordDto } from './dto/request-reset-password.dto';

    
@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService,){}

    @Mutation(() => User)
    async register(@Args('registerDto') registerDto: RegisterDto) {
        return await this.authService.register(registerDto);
    }

    @Mutation(() => AuthResponse)
    async login(@Args('loginDto') loginDto: LoginDto) {
        return await this.authService.login(loginDto);
    }

    @Mutation(() => String)
    async requestResetPassword(@Args('requestResetPasswordDto') requestPassDto: RequestResetPasswordDto) {
        return await this.authService.requestResetPassword(requestPassDto);
    }
}