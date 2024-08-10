import { Transaction } from '../model/transaction.model';
import * as path from 'path';
import * as fs from 'fs';

export class TransactionAdapter {
    private readonly filePath = path.resolve('./src/transactions/data/transactions.json');

    public readManager(): Transaction[] {
        const data = fs.readFileSync(this.filePath, 'utf8');
        return JSON.parse(data) as Transaction[];
    }

    public writeManager(accounts: Transaction[]): void {
        fs.writeFileSync(this.filePath, JSON.stringify(accounts, null, 2), 'utf8')
    }
}