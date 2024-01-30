import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { WalletDto } from './dto';
import { User } from '@prisma/client';
import { decodedString, generateTransactionId, statusEnum } from '../common/random';
import { PaymentsService } from 'src/payments/payments.service';
import { TransactionsService } from '../transactions/transactions.service';

@Injectable()
export class WalletService {
    constructor(
        private prisma: PrismaService, 
        private payment: PaymentsService, 
        private transactions: TransactionsService
    ) {}

    async initiateWalletFunding (user: User, walletDto: WalletDto) {
        try {
            /** 
             * Call payment gateway
             * And if payment was
             * successful at the payment
             * gateway then proceed
             * to credit agent wallet
             */
  
            /** Fetch wallet processing ledger */
            let wallet_book: any, wallet_funding_ledger: any;
            const { amount, fundingType } = walletDto;
            if(fundingType === "Transfer") {
                wallet_funding_ledger = await this.prisma.ledgers.findFirst({ 
                    where: {
                        ledger_type: "WALLET BANK TRANSFER" 
                    } 
                });
                wallet_book = await this.prisma.books.findFirst({ 
                    where: {
                        book_type: wallet_funding_ledger.ledger_type,
                        book_source: wallet_funding_ledger.id 
                    } 
                });
            }

            if(fundingType === "Virtual Account") {
                wallet_funding_ledger = await this.prisma.ledgers.findFirst({ 
                    where: {
                        ledger_type: "WALLET VIRTUAL ACCOUNT" 
                    } 
                });
                wallet_book = await this.prisma.books.findFirst({ 
                    where: {
                        book_type: wallet_funding_ledger.ledger_type,
                        book_source: wallet_funding_ledger.id 
                    } 
                });
            }

            /** Fetch wallet book id */
            const agent_wallet_book = await this.prisma.books.findFirst({ 
                where: {
                    book_type: "AGENT",
                    book_source: user.id 
                } 
            });

            const transactionId = generateTransactionId(); /** Generate transaction Id */
            const processData = {
                agentWalletId: agent_wallet_book.id,  
                walletLedgerId: wallet_book.id,
                ledgerName: wallet_funding_ledger.ledger_name,
                agentWalletName: agent_wallet_book.book_type,
                transactionType: "Wallet Funding",
                providerType: fundingType,
                userId: user.id,
                names: user.name,
                memo: "Agent Wallet Funding",
                amount: amount,
                transactionId: transactionId,
                currencyId: 1
            };

            const response = await this.payment.processWalletFunding(processData); /** Save payment */
            /** Post transactions */
            if(response === true) {
                const transactionRecord = await this.prisma.payments.findFirst({
                    where: {
                        transaction_id: transactionId
                    },
                    orderBy: {
                        id: 'desc'
                    },
                    take: 1
                });

                if(transactionRecord.status === statusEnum().PENDING) {
                    const ledger_posting = decodedString(transactionRecord.ledger);
                    const postTransaction = await this.transactions.postTransactions(ledger_posting);
                    if(postTransaction === true) {
                        await this.prisma.payments.updateMany({
                            where: {
                              transaction_id: transactionId,
                            },
                            data: {
                              status: statusEnum().SUCCESSFUL,
                            },
                        });
                    } else {
                        await this.prisma.payments.updateMany({
                            where: {
                              transaction_id: transactionId,
                            },
                            data: {
                              status: statusEnum().DECLINED,
                            },
                        });

                        return false;
                    }
                }
            } else {
                return false;
            }

            return true;

        } catch (error) {
            throw error;
        }
    }
}
