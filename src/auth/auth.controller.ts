import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @UsePipes( ValidationPipe)
  async signUp(@Body() signUpDto: SignUpDto){
    return await this.authService.signUp(signUpDto) 
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto){
    return await this.authService.login(loginDto)
  }
  
}
