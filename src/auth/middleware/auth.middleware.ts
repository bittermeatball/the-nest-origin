import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from  '../auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private  readonly  authService:  AuthService) {}
  async use(req: Request, res: Response, next: Function) {
    try {
        var auth = await this.authService.verify(req.headers.authorization)
        if(auth.is_valid) {
            next();
        } else {
            throw new HttpException('Unauthorized request!', HttpStatus.UNAUTHORIZED);
        }
    } catch (error) {
        return error
    }
  }
}
