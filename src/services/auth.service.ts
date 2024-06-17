import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from 'src/dto/register.dto';
import { UserService } from 'src/services/user.service';
import * as bcryptjs  from 'bcryptjs'
import { LoginDto } from 'src/dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    
    constructor(
        private  readonly userService: UserService,
        private readonly jwtService: JwtService,
    ){}

    async register({name,lastName,email,password} : RegisterDto){
        const user = await this.userService.getUserByEmail(email)

        if(user){
            throw new BadRequestException('User already exist');
        }
        
        return await this.userService.createUser({
            name,
            lastName,
            email,
            password: await bcryptjs.hash(password, 10),
        });
    }


    async login({email,password}: LoginDto) {
        const user = await this.userService.getUserByEmail(email);

        if(!user){
            throw new UnauthorizedException('Email is wrong')
        }

        const isPasswordValid =  await bcryptjs.compare(password, user.password);

        if(!isPasswordValid){
            throw new UnauthorizedException('Password is wrong')
        }

        const payload = {id: user.id};
        const token = await this.jwtService.signAsync(payload);

        return {
            token,
            email,
        } ;
}

}