import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto'; 
import { UserService } from 'src/users/user.service';
import * as bcryptjs  from 'bcryptjs'
import { LoginDto } from './dto/login.dto'; 
import { JwtService } from '@nestjs/jwt';
import { response } from 'express';
import { AuthResponse } from './dto/auth-response';
import { RequestResetPasswordDto } from './dto/request-reset-password.dto';
import * as nodemailer from 'nodemailer';
import { User } from 'src/users/create-user.dto';

@Injectable()
export class AuthService {
   
    constructor(
        private  readonly userService: UserService,
        private readonly jwtService: JwtService,
    ){}


    async register(registerDto : RegisterDto): Promise<User> {
        const {name, lastName, email, password1, password2} = registerDto;        

        if(password1 !== password2){
            throw new BadRequestException('Passwords do not match');
        }
        const user = await this.userService.getUserByEmail(email)

        if(user){
            throw new BadRequestException('User already exist');
        }
        
        return await this.userService.createUser({
            name,
            lastName,
            email,
            password1: await bcryptjs.hash(password1, 10),
            password2
        });
    }


    async login(loginDto: LoginDto) {
        const {email,password} = loginDto;
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
        
        return new AuthResponse(token, user.id);
}

//Muy bonito y todo, pero no llega ningun correo v3
  async requestResetPassword(requestPassDto: RequestResetPasswordDto) {
    const { email } = requestPassDto;
    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Email is wrong');
    }

      const newPassword = 'C' + Math.random().toString(36).slice(-8);
      const hashedPassword = await bcryptjs.hash(newPassword, 10);
      await this.userService.updatePassByEmail({email, newPassword});
      console.log(newPassword)
      console.log(user.password)

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'kuky2881@gmail.com', 
          pass: 'ajkpfynfdsigqgqy',
        },
      });

      await transporter.sendMail({
        from: 'kuky2881@gmail.com', // Remitente
        to: user.email,             //destinatario
        subject: 'Solicitud cambio de contraseña', 
        text: ' Su contraseña temporal: ' + newPassword ,// texto correo electrónico
        
      });


      console.log('CORREO ENVIADO');
      return 'Email sent';
  }


}

