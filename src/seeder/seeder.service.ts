import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SeederService {
    constructor(
        private prisma: PrismaService,
    ) {}

    async seedLedgersAndBooks() {


        /** Seed ledgers and book balance */
        const ledger = await this.prisma.ledgers.create({
            data: {
                ledger_name: 'Wallet Bank Transfer Sales',
                ledger_type: 'WALLET BANK TRANSFER',
                ledger_percentage_commission: "",
                ledger_currency_id: 1,
            },
        });
        await this.prisma.books.create({
            data: {
                book_source: ledger.id,
                book_type: ledger.ledger_type
            }
        });



        /** Seed ledgers 1 and book balance */
        const ledger1 = await this.prisma.ledgers.create({
            data: {
                ledger_name: 'Wallet Virtual Account Sales',
                ledger_type: 'WALLET VIRTUAL ACCOUNT',
                ledger_percentage_commission: "",
                ledger_currency_id: 1,
            },
        });
        await this.prisma.books.create({
            data: {
                book_source: ledger1.id,
                book_type: ledger.ledger_type
            }
        });


        /** Seed ledgers 2 and book balance */
        const ledger2 = await this.prisma.ledgers.create({
            data: {
                ledger_name: 'MTN Airtime Sales',
                ledger_type: 'MTN AIRTIME',
                ledger_percentage_commission: "1.5",
                ledger_currency_id: 1,
            },
        });
        await this.prisma.books.create({
            data: {
                book_source: ledger2.id,
                book_type: ledger.ledger_type
            }
        });


        /** Seed ledgers 3 and book balance */
        const ledger3 = await this.prisma.ledgers.create({
            data: {
                ledger_name: 'GLO Airtime Sales',
                ledger_type: 'GLO AIRTIME',
                ledger_percentage_commission: "1.3",
                ledger_currency_id: 1,
            },
        });
        await this.prisma.books.create({
            data: {
                book_source: ledger3.id,
                book_type: ledger.ledger_type
            }
        });

        /** Seed ledgers 4 and book balance */
        const ledger4 = await this.prisma.ledgers.create({
            data: {
                ledger_name: 'MTN Data Sales',
                ledger_type: 'MTN DATA',
                ledger_percentage_commission: "1.7",
                ledger_currency_id: 1,
            },
        });
        await this.prisma.books.create({
            data: {
                book_source: ledger4.id,
                book_type: ledger.ledger_type
            }
        });


        /** Seed ledgers 5 and book balance */
        const ledger5 = await this.prisma.ledgers.create({
            data: {
                ledger_name: 'GLO Data Sales',
                ledger_type: 'GLO DATA',
                ledger_percentage_commission: "1.6",
                ledger_currency_id: 1,
            },
        });
        await this.prisma.books.create({
            data: {
                book_source: ledger5.id,
                book_type: ledger.ledger_type
            }
        });

        /** Seed ledgers 6 and book balance */
        const ledger6 = await this.prisma.ledgers.create({
            data: {
                ledger_name: 'DSTV Sales',
                ledger_type: 'DSTV',
                ledger_percentage_commission: "1.4",
                ledger_currency_id: 1,
            },
        });
        await this.prisma.books.create({
            data: {
                book_source: ledger6.id,
                book_type: ledger.ledger_type
            }
        });

        /** Seed ledgers 7 and book balance */
        const ledger7 = await this.prisma.ledgers.create({
            data: {
                ledger_name: 'GOTV Sales',
                ledger_type: 'GOTV',
                ledger_percentage_commission: "1.6",
                ledger_currency_id: 1,
            },
        });
        await this.prisma.books.create({
            data: {
                book_source: ledger7.id,
                book_type: ledger.ledger_type
            }
        });


        /** Seed ledgers 8 and book balance */
        const ledger8 = await this.prisma.ledgers.create({
            data: {
                ledger_name: 'EKO Electricity Sales',
                ledger_type: 'EKO ELECTRICITY',
                ledger_percentage_commission: "1.4",
                ledger_currency_id: 1,
            },
        });
        await this.prisma.books.create({
            data: {
                book_source: ledger8.id,
                book_type: ledger.ledger_type
            }
        });


        /** Seed ledgers 9 and book balance */
        const ledger9 = await this.prisma.ledgers.create({
            data: {
                ledger_name: 'JOS Electricity Sales',
                ledger_type: 'JOS ELECTRICITY',
                ledger_percentage_commission: "1.8",
                ledger_currency_id: 1,
            },
        });
        await this.prisma.books.create({
            data: {
                book_source: ledger9.id,
                book_type: ledger.ledger_type
            }
        });
    }
}
