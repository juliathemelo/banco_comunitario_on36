import { Account, AccountType } from './account.model';

export class SavingAccount extends Account {
constructor(
    id: number,
    idClient: number,
    idManager: number,
    balance: number,
    public interest: number // Propriedade adicional para contas de poupança (juros)
) {
    super(id, idClient, idManager, AccountType.SAVING, balance);
}}