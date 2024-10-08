import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards, Request } from '@nestjs/common';

import { AuthService } from './auth.service';

import { CreateUserDto, LoginDto, RegisterUserDto, UpdateUserDto } from './dto';

import { AuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.loginAsync(loginDto);
  }

  @Get('refresh-token')
  @UseGuards(AuthGuard)
  async refreshToken(@Request() req : Request) {
    return await this.authService.refreshToken(req['user']);
  }

  @Get('user')
  @UseGuards(AuthGuard)
  async findAll() {
    return await this.authService.findAllAsync();
  }

  @Get('user/:id')
  @UseGuards(AuthGuard)
  async findOne(@Param('id') id: string) {
    return await this.authService.findOneAsync(id);
  }

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    return await this.authService.registerAsync(registerUserDto);
  }

  @Post('user')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.authService.createAsync(createUserDto);
  }

  // @Patch('user/:id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.authService.update(+id, updateUserDto);
  // }

  // @Delete('user/:id')
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(+id);
  // }
}
