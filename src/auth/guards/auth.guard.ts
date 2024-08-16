import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserResponse, JwtPayload } from '../interfaces';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private jwtService: JwtService,
    private authService: AuthService
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('There is no bearer token in the request');
    }

    let payload: JwtPayload;

    try {
      payload = await this.jwtService.verifyAsync<JwtPayload>(token, {
        secret: process.env.JWT_SEED
      });
    } catch (e) {
      throw new UnauthorizedException('There is no bearer token in the request');
    }

    // validar el vencimiento del token
    if (payload.exp < Date.now() / 1000) throw new UnauthorizedException('The token has expired');

    const user = await this.authService.findOneAsync(payload.id);

    if (!user) throw new UnauthorizedException('The user does not exist');
    if (!user.isActive) throw new UnauthorizedException('The user is not active');

    request.user = user;

    return Promise.resolve(true);
  }

  private extractTokenFromHeader(request: any): string {
    const header = request.headers['authorization'];
    if (!header) {
      return null;
    }

    const parts = header.split(' ');
    if (parts.length !== 2) {
      return null;
    }

    const [scheme, token] = parts;
    if (!/^Bearer$/i.test(scheme)) {
      return null;
    }

    return token;
  }
}
