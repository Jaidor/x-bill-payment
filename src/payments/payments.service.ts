import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { encodeString } from '../common/random';

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

    async savePayments ( pay: any ): Promise<any> {
        try {
            /** Save into DB */
            const paymentData = await this.prisma.payments.create({
                data: {
                    transaction_id: pay.transactionId,
                    transaction_type: pay.transactionType,
                    user_id: pay.userId,
                    amount: pay.amount,
                    commission_amount: pay.commissionAmount,
                    memo: pay.memo,
                    provider_type: pay.providerType,
                    received_from: pay.receivedFrom,
                    paid_to: pay.paidTo,
                    currency_id: pay.currencyId,
                    ledger: pay.ledger,
                    reversal: pay.reversal
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
        
                amount: (-1 * data.amount),
                memo: `${data.memo} - ${data.ledgerName}`,
                transaction_id: data.transactionId,
                book_id: data.agentWalletId,
                ledger_name: data.agentWalletName,
                value_date: date
                
            }
            transactions.push(agentTransactions);
        
            const ledgerWalletTransactions = {

                amount: data.amount,
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
            const fundingData = {
                transactionId: data.transactionId,
                transactionType: data.transactionType,
                userId: data.userId,
                amount: data.amount,
                memo: `${data.memo} - ${data.agentWalletName}`,
                currencyId: data.currencyId,
                providerType: data.providerType,
                receivedFrom: `${data.names}`,
                paidTo: data.ledgerName,
                ledger: encodeString(transactions),
                reversal: encodeString(reversal)
            }

            const walletFundingPayments = await this.savePayments(fundingData);
            if(walletFundingPayments) {
                return true;
            }

        } catch (error) {
            throw error;
        }
    }
}
