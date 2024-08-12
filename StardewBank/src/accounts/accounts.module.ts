import { Module, forwardRef } from '@nestjs/common';
import { AccountsController } from './adapters/inbound/accounts.controller';
import { AccountsService } from './application/accounts.service';
import { CustomersModule } from '../customers/customers.module';
import { ManagersService } from 'src/managers/application/managers.service';
import { AccountsRepository } from './adapters/outbound/accounts.repository';

@Module({
  imports: [CustomersModule],
  controllers: [AccountsController],
  providers: [AccountsService, AccountsRepository],
  exports: [AccountsService, AccountsRepository]
})
export class AccountsModule {}