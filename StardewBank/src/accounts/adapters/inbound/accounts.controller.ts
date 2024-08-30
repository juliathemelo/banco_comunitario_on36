import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Account } from 'src/accounts/domain/account.model';
import { SavingAccount } from 'src/accounts/domain/savingAccount.model';
import { AccountsService } from 'src/accounts/application/accounts.service';
import { AccountEntity } from 'src/accounts/entities/account.entity';
import { AccountType } from 'src/accounts/domain/accounts.type';
import { CreateAccountDto } from 'src/accounts/dto/create-account.dto';
import { UpdateAccountDto } from 'src/accounts/dto/update-account.dto';

@Controller('accounts')
export class AccountsController {
    constructor(private readonly accountService: AccountsService) {

    }

    @Get()
    findAllAccounts(): Promise<AccountEntity[]> {
        return this.accountService.findAllAccounts();
    }

    @Post(':idManager/')
    createSavingAccount(@Param('idManager') idManager: string, @Body() createAccountDto: CreateAccountDto): Promise<AccountEntity> {
        return this.accountService.createAccount(createAccountDto);
    }

    @Patch(':id/updateAccount')
    updateAccount(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto): Promise<AccountEntity> {
        return this.accountService.updateAccount(id, updateAccountDto);
    }

    @Delete(':id')
    deleteAccount(@Param('id') id: string): Promise<void> {
        return this.accountService.removeAccount(id);
    }
}
