import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
      throw new HttpException('Unauthorized: No token provided', HttpStatus.UNAUTHORIZED);
    }

    verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        throw new HttpException('Unauthorized: Invalid token', HttpStatus.UNAUTHORIZED);
      }
      req.user = decoded;
      next();
    });
  }
}
