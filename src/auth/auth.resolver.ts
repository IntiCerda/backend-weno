import { Body, Controller, Get, Injectable, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './register.dto';
import { LoginDto } from './login.dto'; 
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';


@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService,){}

    @Mutation(() => RegisterDto)
    async register(@Body('registerDto') registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }
    //Si cambio Body por Args da error.

    @Mutation(() => LoginDto)
    async login(@Body('loginDto') loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }
}