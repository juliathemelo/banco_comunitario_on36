import { Module } from '@nestjs/common';
import { AccountsController } from './adapters/inbound/accounts.controller';
import { AccountsService } from './application/accounts.service';
import { CustomersModule } from '../customers/customers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsRepository } from './adapters/outbound/accounts.repository';
import { AccountEntity } from './entities/account.entity';
import { CustomersService } from 'src/customers/application/customers.service';
import { ManagersModule } from '../managers/managers.module';

@Module({
  imports: [CustomersModule, ManagersModule, TypeOrmModule.forFeature([AccountEntity])],
  controllers: [AccountsController],
  providers: [AccountsService, AccountsRepository],
  exports: [AccountsService, AccountsRepository]
})
export class AccountsModule {}