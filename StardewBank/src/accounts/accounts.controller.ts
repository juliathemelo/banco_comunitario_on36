import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Account, AccountType } from './account.model';
import { SavingAccount } from './savingAccount.model';
import { AccountsService } from './accounts.service';
import { CurrentAccount } from './currentAccount.model';

@Controller('accounts')
export class AccountsController {
    constructor(private readonly accountService: AccountsService) {

    }

    @Post('/savingAccount')
    createSavingAccount(@Body('idClient') idClient: number, @Body('idManager')  idManager: number, @Body('balance')  balance: number, @Body('interest')  interest: number): SavingAccount {
        return this.accountService.createSavingAccount(idClient, idManager,balance, interest);
    }

    @Post('/currentAccount')
    createCurrentAccount(@Body('idClient') idClient: number, @Body('idManager')  idManager: number, @Body('balance')  balance: number, @Body('limit')  limit: number): CurrentAccount {
        return this.accountService.createCurrentAccount(idClient, idManager,balance, limit);
    }

    @Patch(':id/updateAccount')
    updateAccount(@Param('id') id: number, @Body('newType') newType: AccountType, @Body('specificProperty') specificProperty: number): SavingAccount | CurrentAccount {
        return this.accountService.updateAccountType(id, newType, specificProperty);
    }

    @Patch(':id/updateManagerBalance')
    updateManagerAndBalance(@Param('id') id: number, @Body('balance') balance: number, @Body('idManager') idManager: number): Account {
        return this.accountService.updateAccountManagerAndBalance(id, balance, idManager);
    }

    @Delete(':id')
    deleteAccount(@Param('id') id: number): void {
        return this.accountService.removeAccount(id);
    }
}
