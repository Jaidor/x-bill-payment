import { Controller, Post, UseGuards, HttpStatus, Body } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { GetUser } from '../auth/decorator';
import { User } from '@prisma/client';
import { JwtGuard } from '../auth/guard';
import { WalletDto } from './dto';
import { 
    successResponseMessage, 
    errorResponseMessage, 
    responseStatus 
} from '../common/helpers/app.helper';

@Controller('wallet')
export class WalletController {
    constructor(private walletService: WalletService) {}

    /**
     * Wallet funding
     * @param user 
     * @param WalletDto 
     * @returns 
     */

    @UseGuards(JwtGuard)
    @Post('fund')
    async agentWalletFunding(@GetUser() user: User, @Body() WalletDto: WalletDto) {
        const responseData = await this.walletService.initiateWalletFunding(user, WalletDto);
        if(!responseData) {
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                message: errorResponseMessage.FAILED_WALLET_FUNDING_MESSAGE,
                status: responseStatus.FAILED,
                data: {accessToken: responseData}
            }
        }
        return {
            statusCode: HttpStatus.OK,
            message: successResponseMessage.SUCCESS_WALLET_FUNDING_MESSAGE,
            status: responseStatus.SUCCESS,
            data: responseData
        }
    }
}
