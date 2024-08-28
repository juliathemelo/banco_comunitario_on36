import { Injectable, NotFoundException, Inject, forwardRef } from '@nestjs/common';
import { Account } from '../domain/account.model';
import { SavingAccount } from '../domain/savingAccount.model';
import { AccountType } from '../domain/accounts.type';
import { CustomersService } from '../../customers/application/customers.service';
import { CurrentAccount } from '../domain/currentAccount.model';
import { AccountsRepository } from '../adapters/outbound/accounts.repository';
import { AccountFactory } from '../domain/accounts.factory';

@Injectable()
export class AccountsService {

    private accountRepository: AccountsRepository;

    constructor(private readonly customersService: CustomersService) {
        this.accountRepository = new AccountsRepository();
    }

    //Consultar Clientes no geral
    findAllAccounts(): Account[] {
        const accounts = this.accountRepository.readAccounts();
        return accounts;
    }

    //Criação conta
    createAccount(idClient: number, idManager: number, balance: number, type: AccountType, specificProperty: number): SavingAccount | CurrentAccount {
        const accounts = this.accountRepository.readAccounts();

        let newAccount: SavingAccount | CurrentAccount;


        if(this.customersService.customerExists(Number(idClient))) {
            const newAccountId = this.accountRepository.getNextId(accounts);

            if (type === AccountType.SAVING) {
                newAccount = AccountFactory.createAccount(AccountType.SAVING, newAccountId, idClient, idManager, balance, specificProperty) as SavingAccount;
            } else if (type === AccountType.CURRENT) {
                newAccount = AccountFactory.createAccount(AccountType.CURRENT, newAccountId, idClient, idManager, balance, specificProperty) as CurrentAccount;
            }

            accounts.push(newAccount);
            this.accountRepository.writeAccounts(accounts);
        } else {
            throw new NotFoundException(`Cliente com o ${idClient} não existe`);
        }

        return newAccount
    }

    //atualização tipo de conta
    updateAccount(id: number, newType: AccountType, balance: number,specificProperty: number): SavingAccount | CurrentAccount {
        const accounts = this.accountRepository.readAccounts();
        const accountIndex = accounts.findIndex(account => account.id === Number(id));

        const oldAccount = accounts[accountIndex];
        let newAccount: SavingAccount | CurrentAccount;

        if (newType === AccountType.SAVING) {
            newAccount = AccountFactory.createAccount(AccountType.SAVING, oldAccount.id, oldAccount.idClient, oldAccount.idManager, balance, specificProperty) as SavingAccount;
        } else if (newType === AccountType.CURRENT) {
            newAccount = AccountFactory.createAccount(AccountType.CURRENT, oldAccount.id, oldAccount.idClient, oldAccount.idManager, balance, specificProperty) as CurrentAccount;
        }
        
        accounts[accountIndex] = newAccount;
        this.accountRepository.writeAccounts(accounts);

        return newAccount
    }

    removeAccount(id: number): void {
        const accounts = this.accountRepository.readAccounts();
        const accountIndex = accounts.findIndex(account => account.id === Number(id));
        accounts.splice(accountIndex, 1);
        this.accountRepository.writeAccounts(accounts)
    }
}
