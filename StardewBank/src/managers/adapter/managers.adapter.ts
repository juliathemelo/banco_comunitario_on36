import { Manager } from '../model/manager.model';
import * as path from 'path';
import * as fs from 'fs';

export class ManagerAdapter {
    private readonly filePath = path.resolve('./src/managers/data/managers.json');

    public readManager(): Manager[] {
        const data = fs.readFileSync(this.filePath, 'utf8');
        return JSON.parse(data) as Manager[];
    }

    public writeManager(accounts: Manager[]): void {
        fs.writeFileSync(this.filePath, JSON.stringify(accounts, null, 2), 'utf8')
    }
}