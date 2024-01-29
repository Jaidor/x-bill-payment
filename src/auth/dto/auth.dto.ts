import { IsEmail, IsNotEmpty, IsString, IsNumber } from 'class-validator';

/**
 * AuthDot
 */
export class AuthDto {

    @IsString()
    @IsNotEmpty()
    firstname: string;

    @IsString()
    @IsNotEmpty()
    lastname: string;

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

}

/**
 * AuthLoginDto
 */
export class AuthLoginDto {

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

}