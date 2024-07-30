import { Module } from '@nestjs/common';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { CustomersService } from 'src/customers/customers.service';

@Module({
  controllers: [AccountsController],
  providers: [AccountsService, CustomersService]
})
export class AccountsModule {}
