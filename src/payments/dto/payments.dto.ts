import { IsDecimal, IsNotEmpty, IsNumber, IsString } from 'class-validator';

/**
 * Payments Dto
 */
export class PaymentDto {

    @IsString()
    @IsNotEmpty()
    transactionId: string;

    @IsString()
    @IsNotEmpty()
    transactionType: string;

    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @IsNumber()
    @IsNotEmpty()
    amount: string;

    @IsNumber()
    @IsNotEmpty()
    commissionAmount: string;

    @IsString()
    @IsNotEmpty()
    memo: string;

    @IsString()
    @IsNotEmpty()
    providerType: string;

    @IsString()
    @IsNotEmpty()
    receivedFrom: string;

    @IsString()
    @IsNotEmpty()
    paidTo: string;

    @IsNumber()
    @IsNotEmpty()
    currencyId: number;

    @IsString()
    @IsNotEmpty()
    ledger: string;

    @IsString()
    @IsNotEmpty()
    reversal: string;

}