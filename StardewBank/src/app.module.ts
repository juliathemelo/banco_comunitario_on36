import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomersModule } from './customers/customers.module';
import { AccountsModule } from './accounts/accounts.module';
import { ManagersModule } from './managers/managers.module';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [CustomersModule, AccountsModule, ManagersModule, TransactionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
