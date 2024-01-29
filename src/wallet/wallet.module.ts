import { Module } from '@nestjs/common';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { PaymentsService } from '../payments/payments.service';

@Module({
  controllers: [WalletController],
  providers: [WalletService, PaymentsService]
})
export class WalletModule {}
