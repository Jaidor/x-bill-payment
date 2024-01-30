import { Module } from '@nestjs/common';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { PaymentsService } from '../payments/payments.service';
import { TransactionsService } from 'src/transactions/transactions.service';

@Module({
  controllers: [WalletController],
  providers: [WalletService, PaymentsService, TransactionsService]
})
export class WalletModule {}
