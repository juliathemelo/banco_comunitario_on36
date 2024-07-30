import { Module, forwardRef } from '@nestjs/common';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { CustomersModule } from '../customers/customers.module';
import { ManagersService } from 'src/managers/managers.service';
import { AccountsAdapter } from './adapter/accounts.adapter';

@Module({
  imports: [CustomersModule],
  controllers: [AccountsController],
  providers: [AccountsService, AccountsAdapter],
  exports: [AccountsService, AccountsAdapter]
})
export class AccountsModule {}