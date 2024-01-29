import { IsNotEmpty, IsNumber, IsString, IsEnum } from 'class-validator';

/**
 * Funding type
 * status
 */

enum statusEnum {
    'Transfer',
    'Virtual Account'
}

/**
 * Wallet Dto
 */
export class WalletDto {

    @IsNumber()
    @IsNotEmpty()
    amount: string;

    @IsEnum(statusEnum)
    @IsString()
    @IsNotEmpty()
    fundingType: string;

}