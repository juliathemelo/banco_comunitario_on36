import { Account, AccountType } from './account.model';

export class CurrentAccount extends Account {
constructor(
    id: number,
    idClient: number,
    idManager: number,
    balance: number,
    public limit: number // Propriedade adicional para contas de corrente (juros)
) {
    super(id, idClient, idManager, AccountType.CURRENT, balance);
}
}