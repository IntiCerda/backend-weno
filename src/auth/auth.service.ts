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
        
        return new AuthResponse(token, email);
}

//Muy bonito y todo, pero no llega ningun correo v3
  async requestResetPassword(requestPassDto: RequestResetPasswordDto) {
    const { email } = requestPassDto;
    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Email is wrong');
    }

      const newPassword = 'C' + Math.random().toString(36).slice(-8);
      user.password = await bcryptjs.hash(newPassword, 10);


      const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'rahsaan41@ethereal.email',
            pass: 's83GFxjvyW8aPfZAVj'
        }
      });

      const mailOptions = {
        from: 'rahsaan41@ethereal.email',
        to: user.email,
        subject: 'Solicitud de restablecimiento de contraseña',
        text: `
          Hola,
      
          Se ha solicitado un restablecimiento de contraseña para tu cuenta.
          Tu contraseña temporal es: ${newPassword}
          
          Saludos,
          El equipo de la aplicación.
        `,
      };
      console.log('QWEA');
      const sendMail = async(transporter, mailOptions) => {
        try{
          console.log('QWEA2');
          await transporter.sendMail(mailOptions);
          console.log('QWEA3');
        }catch(error){
          console.error(error);
        }
      }
      sendMail(transporter, mailOptions);
      console.log(sendMail.toString());
      return 'Email sent';
  }


}

