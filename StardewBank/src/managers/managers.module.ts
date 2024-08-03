import { Module, forwardRef } from '@nestjs/common';
import { ManagersService } from './managers.service';
import { AccountsModule } from '../accounts/accounts.module';
import { ManagersController } from './managers.controller';

@Module({
  imports: [forwardRef(() => AccountsModule)], // Usando forwardRef para evitar dependências circulares
  controllers: [ManagersController],
  providers: [ManagersService],
  exports: [ManagersService],
})
export class ManagersModule {}