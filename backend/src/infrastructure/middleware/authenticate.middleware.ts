import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';
import { UserRepository } from '../repository/user.repo';

@Injectable()
export class AuthenticateMiddleware implements NestMiddleware {
    constructor(
        private readonly authService: AuthService,
        private readonly userRepo: UserRepository,
    ) { }

    async use(req: Request, res: Response, next: NextFunction) {
        // fetched token using req
        const token = req.headers.authorization || req.headers.Authorization;
        if (!token || Array.isArray(token)) {
            throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);
        }

        //verify token using jwt
        const user = await this.authService.verifyJwtToken(token ?? '');
        if (!user) {
            throw new HttpException("invalid token found", HttpStatus.UNAUTHORIZED);
        }

        // check user's presence in DB
        const isExistsAndActiveUser = await this.userRepo.findByUuid(user.uuid);
        if (!isExistsAndActiveUser.length) {
            throw new HttpException("user not found", HttpStatus.UNAUTHORIZED);
        }

        req.user = isExistsAndActiveUser[0]
        // valid request and authenticate user 
        next();
    }
}