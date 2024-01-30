import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TransactionsService {
    constructor(
        private prisma: PrismaService,
    ) {}

    async postTransactions ( data: any ):Promise<boolean> {

        return true;

    }
}
