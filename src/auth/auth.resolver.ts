import { Body, Controller, Get, Injectable, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './register.dto';
import { LoginDto } from './login.dto'; 
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SignResponse } from './sign-respone';
import { Auth } from './auth.entity';
import { User } from 'src/users/create-user.dto';


@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService,){}

    @Mutation(() => User)
    async register(@Args('registerDto') registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }
    //Si cambio Body por Args da error.

    @Mutation(() => SignResponse)
    async login(@Args('loginDto') loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }
}