import { Injectable, NotFoundException } from '@nestjs/common';
import { Account } from './account.model';
import { SavingAccount } from './savingAccount.model';
import { AccountType } from './account.model';
import * as path from 'path';
import * as fs from 'fs';
import { CustomersService } from '../customers/customers.service';
import { CurrentAccount } from './currentAccount.model';

@Injectable()
export class AccountsService {
    constructor(private readonly customersService: CustomersService) {}

    public readonly filePath = path.resolve('./src/accounts/accounts.json');

    public readAccounts(): Account[] {
        const data = fs.readFileSync(this.filePath, 'utf8');
        return JSON.parse(data) as Account[];
    }

    public writeAccounts(accounts: Account[]): void {
        fs.writeFileSync(this.filePath, JSON.stringify(accounts, null, 2), 'utf8')
    }

    // Propriedades savings account
    private readSavingAccounts(): SavingAccount[] {
        const data = fs.readFileSync(this.filePath, 'utf8');
        return JSON.parse(data) as SavingAccount[];
    }

    private writeSavingAccounts(accounts: SavingAccount[]): void {
        fs.writeFileSync(this.filePath, JSON.stringify(accounts, null, 2), 'utf8');
    }

    // Propriedades current account
    private readCurrentAccounts(): CurrentAccount[] {
        const data = fs.readFileSync(this.filePath, 'utf8');
        return JSON.parse(data) as CurrentAccount[];
    }

    private writeCurrentAccounts(accounts: CurrentAccount[]): void {
        fs.writeFileSync(this.filePath, JSON.stringify(accounts, null, 2), 'utf8');
    }

    //Criação conta
    createSavingAccount(idClient: number, idManager: number, balance: number, interest: number): SavingAccount {
        const accounts = this.readSavingAccounts();

        if(this.customersService.customerExists(Number(idClient))) {
            const newAccount = new SavingAccount(
                accounts.length > 0 ? accounts[accounts.length - 1].id + 1 : 1,
                idClient,
                idManager,
                balance,
                interest
            );
            accounts.push(newAccount);
            this.writeSavingAccounts(accounts);
            return newAccount
        } else {
            throw new NotFoundException(`Cliente com o ${idClient} não existe`);
        }
    }

    createCurrentAccount(idClient: number, idManager: number, balance: number, limit: number): CurrentAccount {
        const accounts = this.readCurrentAccounts();

        if(this.customersService.customerExists(Number(idClient))) {
            const newAccount = new CurrentAccount(
                accounts.length > 0 ? accounts[accounts.length - 1].id + 1 : 1,
                idClient,
                idManager,
                balance,
                limit
            );
            accounts.push(newAccount);
            this.writeCurrentAccounts(accounts);
            return newAccount
        } else {
            throw new NotFoundException(`Cliente com o ${idClient} não existe`);
        }
    }

    updateAccountType(id: number, newType: AccountType, specificProperty: number): SavingAccount | CurrentAccount {
        const accounts = this.readAccounts();
        const accountIndex = accounts.findIndex(account => account.id === Number(id));

        const oldAccount = accounts[accountIndex];
        let newAccount: SavingAccount | CurrentAccount;

        if (newType === AccountType.SAVING) {
            newAccount = new SavingAccount(oldAccount.id, oldAccount.idClient, oldAccount.idManager, oldAccount.balance, specificProperty);
        } else if (newType === AccountType.CURRENT) {
            newAccount = new CurrentAccount(oldAccount.id, oldAccount.idClient, oldAccount.idManager, oldAccount.balance, specificProperty);
        }
        
        accounts[accountIndex] = newAccount;
        this.writeAccounts(accounts);

        return newAccount
    }

    updateAccountManagerAndBalance(id: number, balance: number, idManager: number): Account {
        const accounts = this.readAccounts();
        const account = accounts.find(account => account.id === Number(id));

        account.balance = balance;
        account.idManager = idManager;
        this.writeAccounts(accounts);

        return account
    }

    removeAccount(id: number): void {
        const accounts = this.readAccounts();
        const accountIndex = accounts.findIndex(account => account.id === Number(id));
        accounts.splice(accountIndex, 1);
        this.writeAccounts(accounts)
    }
}
