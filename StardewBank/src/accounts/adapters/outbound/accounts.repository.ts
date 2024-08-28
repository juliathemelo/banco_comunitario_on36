import { Account } from '../../domain/account.model';
import * as path from 'path';
import * as fs from 'fs';

export class AccountsRepository {
    public readonly filePath = path.resolve('./src/accounts/adapters/outbound/accounts.json');

    public readAccounts(): Account[] {
        const data = fs.readFileSync(this.filePath, 'utf8');
        return JSON.parse(data) as Account[];
    }

    public writeAccounts(accounts: Account[]): void {
        fs.writeFileSync(this.filePath, JSON.stringify(accounts, null, 2), 'utf8')
    }

    public getNextId(accounts: Account[]): number {
        return accounts.reduce((maxId, account) => Math.max(maxId, account.id), 0) + 1;
    }
}