import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaymentDto } from './dto';
import { encodeString, decodedString } from '../common/random';

@Injectable()
export class PaymentsService {
    constructor(
        private prisma: PrismaService,
    ) {}

    /**
     * Save payments
     * @param user 
     * @param paymentDto 
     * @returns 
     */

    async savePayments (paymentDto: PaymentDto) {
        try {
            /** Save into DB */
            const paymentData = await this.prisma.payments.create({
                data: {
                    transaction_id: paymentDto.transactionId,
                    transaction_type: paymentDto.transactionType,
                    user_id: paymentDto.userId,
                    amount: paymentDto.amount,
                    commission_amount: paymentDto.commissionAmount,
                    memo: paymentDto.memo,
                    provider_type: paymentDto.providerType,
                    received_from: paymentDto.receivedFrom,
                    paid_to: paymentDto.paidTo,
                    currency_id: paymentDto.currencyId,
                    ledger: paymentDto.ledger,
                    reversal: paymentDto.reversal
                }
            });
            return paymentData;
        } catch (error) {
            throw error;
        }
    }

    async processWalletFunding ( data: any ): Promise<boolean> {
        try {

            const date = new Date();
            let transactions: any[] = [];

            /** Ledger transaction */
            const agentTransactions = {
        
                amount: data.amount,
                memo: `${data.memo} - ${data.ledgerName}`,
                transaction_id: data.transactionId,
                book_id: data.agentWalletId,
                ledger_name: data.agentWalletName,
                value_date: date
                
            }
            transactions.push(agentTransactions);
        
            const ledgerWalletTransactions = {

                amount: (-1 * data.amount),
                memo: data.memo,
                transaction_id: data.transactionId,
                book_id: data.walletLedgerId,
                ledger_name: data.ledgerName,
                value_date: date                 
            }
            transactions.push(ledgerWalletTransactions);


            /** Create reversal */
            let reversal: any[] = [];
            for (let i = 0; i < transactions.length; i++) {
                let reverse = { ...transactions[i] }; /** Create a copy of the object for reversal */
                reverse.amount = -1 * reverse.amount;
                reverse.memo = `Transaction reversal: ${reverse.memo}`;
                reversal.push(reverse);
            }
            
            /** Save Payment */
            const pay = {
                transactionId: data.transactionId,
                transactionType: data.transactionType,
                userId: data.userId,
                amount: data.amount,
                memo: `${data.memo} - ${data.agentWalletName}`,
                providerType: data.providerType,
                receivedFrom: `${data.names}`,
                paidTo: data.ledgerName,
                ledger: encodeString(transactions),
                reversal: encodeString(reversal)
            }
            const walletFundingPayments = await this.savePayments(pay);
            if(walletFundingPayments) {
                return true;
            }

        } catch (error) {
            throw error
        }
    }
}
