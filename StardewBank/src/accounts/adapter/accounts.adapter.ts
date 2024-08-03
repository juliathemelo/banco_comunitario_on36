import { Account } from '../model/account.model';
import * as path from 'path';
import * as fs from 'fs';

export class AccountsAdapter {
    public readonly filePath = path.resolve('./src/accounts/data/accounts.json');

    public readAccounts(): Account[] {
        const data = fs.readFileSync(this.filePath, 'utf8');
        return JSON.parse(data) as Account[];
    }

    public writeAccounts(accounts: Account[]): void {
        fs.writeFileSync(this.filePath, JSON.stringify(accounts, null, 2), 'utf8')
    }
}