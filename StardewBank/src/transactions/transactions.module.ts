import { Module } from '@nestjs/common';
import { TransactionsService } from './application/transactions.service';
import { TransactionsController } from './adapters/inbound/transactions.controller';

@Module({
  providers: [TransactionsService],
  controllers: [TransactionsController]
})
export class TransactionsModule {}
