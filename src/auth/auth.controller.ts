import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @Post('user')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.authService.create(createUserDto);
  }

  @Get('user')
  findAll() {
    return this.authService.findAll();
  }

  @Get('user:id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch('user:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.authService.update(+id, updateUserDto);
  }

  @Delete('user:id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
