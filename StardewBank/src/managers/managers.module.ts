import { Module, forwardRef } from '@nestjs/common';
import { ManagersService } from './application/managers.service';
import { AccountsModule } from '../accounts/accounts.module';
import { ManagersController } from './adapters/inbound/managers.controller';

@Module({
  imports: [forwardRef(() => AccountsModule)], // Usando forwardRef para evitar dependências circulares
  controllers: [ManagersController],
  providers: [ManagersService],
  exports: [ManagersService],
})
export class ManagersModule {}