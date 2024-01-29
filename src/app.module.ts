import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { WalletModule } from './wallet/wallet.module';
import { PaymentsController } from './payments/payments.controller';
import { PaymentsModule } from './payments/payments.module';
import { SeederService } from './seeder/seeder.service';
import { SeederModule } from './seeder/seeder.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, PrismaModule, UserModule, WalletModule, PaymentsModule, SeederModule],
  controllers: [AppController, PaymentsController],
  providers: [AppService, SeederService],
})
export class AppModule {}
