import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Account } from './model/account.model';
import { SavingAccount } from './model/savingAccount.model';
import { AccountsService } from './accounts.service';
import { CurrentAccount } from './model/currentAccount.model';
import { AccountType } from './enums/accounts.type';

@Controller('accounts')
export class AccountsController {
    constructor(private readonly accountService: AccountsService) {

    }

    @Get()
    findAllAccounts(): Account[] {
        return this.accountService.findAllAccounts();
    }

    @Post(':idManager/')
    createSavingAccount(@Param('idManager')  idManager: number, @Body('idClient') idClient: number, @Body('balance')  balance: number, @Body('type')  type: AccountType, @Body('specificProperty')  specificProperty: number): SavingAccount | CurrentAccount {
        return this.accountService.createAccount(Number(idClient), Number(idManager),balance, type, specificProperty);
    }

    @Patch(':id/updateAccount')
    updateAccount(@Param('id') id: number, @Body('newType') newType: AccountType, @Body('balance') balance: number,@Body('specificProperty') specificProperty: number): SavingAccount | CurrentAccount {
        return this.accountService.updateAccount(id, newType, balance, specificProperty);
    }

    @Delete(':id')
    deleteAccount(@Param('id') id: number): void {
        return this.accountService.removeAccount(id);
    }
}
