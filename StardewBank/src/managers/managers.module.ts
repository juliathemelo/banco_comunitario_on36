import { Module, forwardRef } from '@nestjs/common';
import { ManagersService } from './application/managers.service';
import { AccountsModule } from '../accounts/accounts.module';
import { ManagersController } from './adapters/inbound/managers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManagerEntity } from './entities/managers.entity';

@Module({
  imports: [forwardRef(() => AccountsModule), TypeOrmModule.forFeature([ManagerEntity])], // Usando forwardRef para evitar dependências circulares
  controllers: [ManagersController],
  providers: [ManagersService],
  exports: [ManagersService],
})
export class ManagersModule {}