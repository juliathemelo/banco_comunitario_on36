import { Account } from './account.model';
import { AccountType } from './accounts.type';
import { SavingAccount } from './savingAccount.model';
import { CurrentAccount } from './currentAccount.model';

export class AccountFactory {
    static createAccount(
        type: AccountType,
        id: number,
        idClient: number,
        idManager: number,
        balance: number,
        specificProperty: number
    ): Account {
        if (type === AccountType.SAVING) {
            return new SavingAccount(id, idClient, idManager, balance, specificProperty);
        } else if (type === AccountType.CURRENT) {
            return new CurrentAccount(id, idClient, idManager, balance, specificProperty);
        }
        throw new Error('Tipo de conta não existe');
    }
}