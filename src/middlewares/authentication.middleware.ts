import { JwtService } from '@nestjs/jwt';
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from 'src/services/auth/auth.service';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from 'src/decorators/authorization.decorator';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/models/user.model';


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService, private reflector: Reflector,
        @InjectModel(User.name) private authModel: Model<UserDocument>) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {

      const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
      
      if (isPublic) {
        return true;
      }



    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    

    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: process.env.JWT_SECRET_KEY
        }
      );
      
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = await this.authModel.findOne({email:payload.email});
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
