import { 
    Body, 
    Controller, 
    Post, 
    HttpStatus 
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, AuthLoginDto } from './dto';
import { 
    successResponseMessage, 
    errorResponseMessage, 
    responseStatus 
} from '../common/helpers/app.helper';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    /**
     * Signup
     * @param request 
     * @returns 
     */

    @Post('signup')
    async signup(@Body() AuthDto: AuthDto) {
        const responseData = await this.authService.createUser(AuthDto);
        if(!responseData) {
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                message: errorResponseMessage.FAILED_SIGNEDUP_MESSAGE,
                status: responseStatus.FAILED,
                data: {accessToken: responseData}
            }
        }
        return {
            statusCode: HttpStatus.CREATED,
            message: successResponseMessage.SUCCESS_SIGNEDUP_MESSAGE,
            status: responseStatus.SUCCESS,
            data: responseData
        }
    }

    /**
     * Signin
     * @param request 
     * @returns 
     */

    @Post('signin')
    async signin(@Body() AuthLoginDto: AuthLoginDto) {
        const responseData = await this.authService.login(AuthLoginDto);
        if(!responseData) {
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                message: errorResponseMessage.FAILED_LOGIN_MESSAGE,
                status: responseStatus.FAILED,
                data: {accessToken: responseData}
            }
        }
        return {
            statusCode: HttpStatus.OK,
            message: successResponseMessage.SUCCESS_LOGIN_MESSAGE,
            status: responseStatus.SUCCESS,
            data: responseData
        }
    }
}