import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { 
    theBeginningOfLastMonthDate, 
    splitDateWithoutISO, 
    firstDateInCurrentMonth, 
    lastDateInCurrentMonth 
} from '../common/random';

@Injectable()
export class TransactionsService {
    constructor(
        private prisma: PrismaService,
    ) {}

    /**
     * Post transactions
     * @param data 
     * @returns 
     */

    async postTransactions ( data: any ):Promise<boolean> {
        
        // data.transaction_id
        // data.book_id
        // data.memo
        // data.ledger_name
        // data.amount
        // data.value_date

        let success: boolean = false;
        let hold_book_ids: any[] = [];
        for (const e of data) {
            if (!e.transaction_id || !e.book_id || !e.memo || !e.amount || !e.value_date) {
              return false;
            }
            await this.prisma.transactions.create({
                data: {
                  transaction_id: e.transaction_id,
                  book_id: e.book_id,
                  amount: e.amount,
                  memo: e.memo,
                  ledger_name: e.ledger_name
                }
            });
            hold_book_ids.push(e.book_id);
            success = true;
        }
        if(success === true) {
            await this.updateBookBalance(hold_book_ids);
            return true;
        } else {
            return false;
        }
    }

    /**
     * Update book balance
     * @param savedBookIds 
     */

    async updateBookBalance(savedBookIds: any[]): Promise<void> {
        const uniqueSavedBookIds = Array.from(new Set(savedBookIds));
        for (const bookId of uniqueSavedBookIds) {
            const bookData = await this.prisma.books.findFirst({
              where: {
                id: bookId,
              },
            });

            if (bookData.book_type) {
                let transactionsBalance: any = {};
                
                const newReconPoint = theBeginningOfLastMonthDate();
                const previousReconPoint = ( !bookData.book_recon_point || bookData.book_recon_point || bookData.book_recon_amount.lt(0) ) ? [ '2024', '01', '01' ] : splitDateWithoutISO(bookData.book_recon_point);
                const reconPoint = `${previousReconPoint[0]}-${previousReconPoint[1]}-${previousReconPoint[2]}`;
                let reconPointBalance: any = 0;
                reconPointBalance = ( !bookData.book_recon_amount || bookData.book_recon_amount.lt(0) ) ? 0 : bookData.book_recon_amount;

                if (reconPoint !== newReconPoint) {
                    /** Get balance of previous record up to new recon point */
                    const transactionsUptoLastMonth = await this.prisma.transactions.findMany({
                        where: {
                          book_id: bookId,
                          createdAt: {
                            gte: new Date('2024-01-01'),
                            lte: new Date(newReconPoint),
                          },
                        },
                    });
                    transactionsUptoLastMonth.forEach((element) => {
                        reconPointBalance = reconPointBalance.add(element.amount);
                        transactionsBalance[element.id] = reconPointBalance;
                    });

                }

                /** Get balance for this month and update balance */
                let currentMonthBalance: any = 0;
                const firstDayThisMonth = firstDateInCurrentMonth();
                const thisMonthEnd = lastDateInCurrentMonth();
                const thisMonthTransactions = await this.prisma.transactions.findMany({
                    where: {
                      book_id: bookId,
                      createdAt: {
                        gte: firstDayThisMonth,
                        lte: thisMonthEnd,
                      },
                    },
                });
                thisMonthTransactions.forEach((element) => {
                    currentMonthBalance = currentMonthBalance.add(element.amount);
                    transactionsBalance[element.id] = reconPointBalance + currentMonthBalance;
                });

                /** Update book balance */
                const bookBalance = reconPointBalance.add(currentMonthBalance);
                await this.prisma.books.update({
                    where: {
                        id: bookId,
                    },
                    data: {
                        book_balance: bookBalance,
                        book_recon_point: newReconPoint,
                        book_recon_amount: reconPointBalance
                    },
                });

                /** Update transaction balances */
                for (const [txId, balance] of Object.entries(transactionsBalance)) {
                    await this.prisma.transactions.update({
                        where: { id: txId },
                        data: { balance: balance }
                    });
                }
            }
        }

    }
}
