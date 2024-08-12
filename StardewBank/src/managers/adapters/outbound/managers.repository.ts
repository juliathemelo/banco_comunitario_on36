import { Manager } from '../../domain/manager.model';
import * as path from 'path';
import * as fs from 'fs';

export class ManagerRepository {
    private readonly filePath = path.resolve('./src/managers/adapters/outbound/managers.json');

    public readManager(): Manager[] {
        const data = fs.readFileSync(this.filePath, 'utf8');
        return JSON.parse(data) as Manager[];
    }

    public writeManager(accounts: Manager[]): void {
        fs.writeFileSync(this.filePath, JSON.stringify(accounts, null, 2), 'utf8')
    }
}