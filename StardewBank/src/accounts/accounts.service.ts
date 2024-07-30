import { Injectable, NotFoundException, Inject, forwardRef } from '@nestjs/common';
import { Account } from './model/account.model';
import { SavingAccount } from './model/savingAccount.model';
import { AccountType } from './enums/accounts.type';
import * as path from 'path';
import * as fs from 'fs';
import { CustomersService } from '../customers/customers.service';
import { ManagersService } from 'src/managers/managers.service';
import { CurrentAccount } from './model/currentAccount.model';
import { AccountsAdapter } from './adapter/accounts.adapter';
import { AccountFactory } from './factory/accounts.factory';

@Injectable()
export class AccountsService {

    private accountAdapter: AccountsAdapter;

    constructor(private readonly customersService: CustomersService) {
        this.accountAdapter = new AccountsAdapter();
    }

    private getNextId(accounts: Account[]): number {
        return accounts.reduce((maxId, account) => Math.max(maxId, account.id), 0) + 1;
    }

    //Consultar Clientes no geral
    findAllAccounts(): Account[] {
        const accounts = this.accountAdapter.readAccounts();
        return accounts;
    }

    //Criação conta
    createAccount(idClient: number, idManager: number, balance: number, type: AccountType, specificProperty: number): SavingAccount | CurrentAccount {
        const accounts = this.accountAdapter.readAccounts();

        let newAccount: SavingAccount | CurrentAccount;


        if(this.customersService.customerExists(Number(idClient))) {
            const newAccountId = this.getNextId(accounts);

            if (type === AccountType.SAVING) {
                newAccount = AccountFactory.createAccount(AccountType.SAVING, newAccountId, idClient, idManager, balance, specificProperty) as SavingAccount;
            } else if (type === AccountType.CURRENT) {
                newAccount = AccountFactory.createAccount(AccountType.CURRENT, newAccountId, idClient, idManager, balance, specificProperty) as CurrentAccount;
            }

            accounts.push(newAccount);
            this.accountAdapter.writeAccounts(accounts);
        } else {
            throw new NotFoundException(`Cliente com o ${idClient} não existe`);
        }

        return newAccount
    }

    //atualização tipo de conta
    updateAccount(id: number, newType: AccountType, balance: number,specificProperty: number): SavingAccount | CurrentAccount {
        const accounts = this.accountAdapter.readAccounts();
        const accountIndex = accounts.findIndex(account => account.id === Number(id));

        const oldAccount = accounts[accountIndex];
        let newAccount: SavingAccount | CurrentAccount;

        if (newType === AccountType.SAVING) {
            newAccount = AccountFactory.createAccount(AccountType.SAVING, oldAccount.id, oldAccount.idClient, oldAccount.idManager, balance, specificProperty) as SavingAccount;
        } else if (newType === AccountType.CURRENT) {
            newAccount = AccountFactory.createAccount(AccountType.CURRENT, oldAccount.id, oldAccount.idClient, oldAccount.idManager, balance, specificProperty) as CurrentAccount;
        }
        
        accounts[accountIndex] = newAccount;
        this.accountAdapter.writeAccounts(accounts);

        return newAccount
    }

    removeAccount(id: number): void {
        const accounts = this.accountAdapter.readAccounts();
        const accountIndex = accounts.findIndex(account => account.id === Number(id));
        accounts.splice(accountIndex, 1);
        this.accountAdapter.writeAccounts(accounts)
    }
}
