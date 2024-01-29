import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto, AuthLoginDto } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable({})
export class AuthService {
    constructor(
        private prisma: PrismaService, 
        private Jwt: JwtService, 
        private config: ConfigService
    ) {}
    
    /**
     * Create User
     * @param dto 
     * @returns 
     */

    async createUser (request: AuthDto) {
        try {
            const hash = await argon.hash(request.password);
            const user = await this.prisma.user.create({
                data: {
                    name: `${request.firstname} ${request.lastname}`,
                    username: request.username,
                    email: request.email,
                    password: hash
                }
            })
            /** Wallet / Book balance for agent */
            await this.prisma.books.create({
                data: {
                    book_source_id: user.id,
                    book_type: "AGENT"
                }
            });
            return this.signToken(user.id, user.email);
        } catch (error) {
            throw error;
        }
    }


    /**
     * Login
     * @param request 
     * @returns string
     * @throws ForbiddenException
     */
    
    async login (request: AuthLoginDto) {
        try {

            /** Checks for email */
            const user = await this.prisma.user.findUnique({ 
                where: {
                    email: request.email 
                } 
            });
            if(!user) {
                throw new UnauthorizedException("Credentials Incorrect");
            }
            /** Verify password */
            const passwordMatches = await argon.verify(user.password, request.password);
            if(!passwordMatches) {
                throw new UnauthorizedException("Credentials Incorrect");
            }
            return this.signToken(user.id, user.email);

        } catch (error) {
            throw error;
        }
    }

    /**
     * Sign in token
     * @param userId 
     * @param email 
     * @returns
     */

    signToken (
        userId: number, 
        email: string
        ): Promise<string> {
        const payload = {
            sub: userId,
            email
        }
        const secret = this.config.get('JWT_SECRET');
        const token = this.Jwt.signAsync(payload, { 
            expiresIn: this.config.get('JWT_EXPIRES'),
            secret: secret
        });

        return token;
    }
}