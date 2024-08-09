import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from  '@nestjs/mongoose';
import { AuthService } from './auth.service';

import { AuthController } from './auth.controller';
import { UserSchema } from './entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),

    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema }
    ]),

    JwtModule.register({
      global: true,
      secret: process.env.JWT_SEED,
      signOptions: { expiresIn: process.env.JWT_EXPIRATION },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
