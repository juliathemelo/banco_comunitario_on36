import { Module } from '@nestjs/common';
import { CustomersController } from './adapters/inbound/customers.controller';
import { CustomersService } from './application/customers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerEntity } from './entities/customers.entities';
import { UtilsAdapter } from 'src/utils/utils.adapter';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerEntity])],
  controllers: [CustomersController],
  providers: [CustomersService, UtilsAdapter],
  exports: [CustomersService]
})
export class CustomersModule {}
