import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';

import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';

import { User } from './entities/user.entity';

import { JwtPayload } from './interfaces/jwt-payload';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,

    private jwtService: JwtService
  ) {}

  async loginAsync(loginDto: LoginDto) {
    const {password, email} = loginDto;

    // Buscar el usuario en la base de datos
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Comparar la contraseña encriptada
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const {password: _, ...userData } = user.toJSON();

    return {
      user: userData,
      token: this._getJwtToken({ id: user.id })
    };
  }

  async createAsync(createUserDto: CreateUserDto) : Promise<User> {
    try {

      // Encriptar la contraseña antes de guardarla en la base de datos
      const {password, ...userData} = createUserDto;
      const createdUser = new this.userModel({
        ...userData,
        password: await bcrypt.hash(password, 10)
      });

      await createdUser.save();

      const {password: _, ...user} = createdUser.toJSON();
      return user;

    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(`Email ${createUserDto.email} already exists`);
      }

      console.log(error);
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  private _getJwtToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }
}
