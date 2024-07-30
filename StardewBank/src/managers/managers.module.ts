import { Module } from '@nestjs/common';
import { ManagersController } from './managers.controller';
import { ManagersService } from './managers.service';
import { AccountsService } from 'src/accounts/accounts.service';
import { CustomersService } from 'src/customers/customers.service';

@Module({
  controllers: [ManagersController],
  providers: [ManagersService, AccountsService, CustomersService]
})
export class ManagersModule {}
