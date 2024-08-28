import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerEntity } from './customers/entities/customers.entities';
import { ManagerEntity } from './managers/entities/managers.entity';
import { CustomersModule } from './customers/customers.module';
import { AccountsModule } from './accounts/accounts.module';
import { ManagersModule } from './managers/managers.module';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: "postgres",
    host: "aws-0-sa-east-1.pooler.supabase.com",
    port: 6543,
    username: "postgres.zenexzvpsyteulqnakzk",
    password: "mv8hwKqfa6G5yrot",
    database: "postgres",
    entities: [CustomerEntity, ManagerEntity],
    synchronize: true,
    logging: true,
  }),CustomersModule, AccountsModule, ManagersModule, TransactionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
