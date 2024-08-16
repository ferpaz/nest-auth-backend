import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';

import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';

import { User } from './entities/user.entity';

import { JwtPayload, LoginResponse, UserResponse } from './interfaces';
import { CreateUserDto, LoginDto, RegisterUserDto, UpdateUserDto } from './dto';



@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,

    private jwtService: JwtService
  ) { }

  async loginAsync(loginDto: LoginDto): Promise<LoginResponse> {
    const { password, email } = loginDto;

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

    const { password: _, ...userData } = user.toJSON();

    return {
      user: userData,
      token: this._getJwtToken({ id: user.id })
    };
  }

  async registerAsync(registerUserDto: RegisterUserDto): Promise<LoginResponse> {
    const user = await this.createAsync(registerUserDto);

    return {
      user,
      token: this._getJwtToken({ id: user._id.toString() })
    };
  }

  async findAllAsync(): Promise<UserResponse[]> {
    const users = await this.userModel.find();

    return users.map(user => {
      const userJson = user.toJSON();

      // Aquí puedes transformar userJson en FindResponse
      const findResponse: UserResponse = {
        _id: userJson._id.toString(),
        email: userJson.email,
        name: userJson.name,
        isActive: userJson.isActive,
        role: userJson.role,
        createdAt: userJson.createdAt,
        updatedAt: userJson.updatedAt
      };

      return findResponse;
    });
  }

  async findOneAsync(id: string): Promise<UserResponse> {
    try {
      const user = await this.userModel.findById(id);

      return {
        _id: user._id.toString(),
        email: user.email,
        name: user.name,
        isActive: user.isActive,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      };
    }
    catch (e) {
      throw new NotFoundException('The user does not exist');
    }
  }

  async refreshToken(user : UserResponse) : Promise<LoginResponse> {
    return {
      user: {
        email: user.email,
        name: user.name,
        isActive: user.isActive,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      },
      token: this._getJwtToken({ id: user._id })
    };
  }

  async createAsync(createUserDto: CreateUserDto): Promise<User> {
    try {

      // Encriptar la contraseña antes de guardarla en la base de datos
      const { password, ...userData } = createUserDto;

      const createdUser = new this.userModel({
        ...userData,
        password: await bcrypt.hash(password, 10)
      });

      const newUser = await createdUser.save();

      const { password: _, ...user } = newUser.toJSON();
      return user;

    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(`Email ${createUserDto.email} already exists`);
      }

      console.log(error);
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }

  private _getJwtToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }
}
