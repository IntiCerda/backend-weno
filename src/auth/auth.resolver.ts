import { AuthService } from './auth.service';
import { RegisterDto } from './register.dto';
import { LoginDto } from './login.dto'; 
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthResponse } from './auth-response'; 
import { User } from 'src/users/create-user.dto';


@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService,){}

    @Mutation(() => User)
    async register(@Args('registerDto') registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

    @Mutation(() => AuthResponse)
    async login(@Args('loginDto') loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }
}