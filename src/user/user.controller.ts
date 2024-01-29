import { Controller, Get, UseGuards, HttpStatus } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { User } from '@prisma/client';
import { UserService } from './user.service';
import { 
    successResponseMessage, 
    errorResponseMessage, 
    responseStatus 
} from '../common/helpers/app.helper';

@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}

    /**
     * fetch signle
     * agent user
     * @param user 
     * @returns 
     */

    @UseGuards(JwtGuard)
    @Get('single')
    async getSingleUser(@GetUser() user: User ) {
        return user;
    }

    /**
     * Fetch all
     * agent users
     * @returns mixed
     */

    @UseGuards(JwtGuard)
    @Get('all')
    async getAllUser() {
        const responseData = await this.userService.fetchAllUsers();
        if(!responseData) {
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                message: errorResponseMessage.FAILED_FETCHED_MESSAGE,
                status: responseStatus.FAILED,
                data: []
            }
        }
        return {
            statusCode: HttpStatus.OK,
            message: successResponseMessage.SUCCESS_FETCHED_MESSAGE,
            status: responseStatus.SUCCESS,
            data: responseData
        }
    }
}
