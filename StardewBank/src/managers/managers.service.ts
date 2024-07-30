import { Injectable, MaxFileSizeValidator, NotFoundException } from '@nestjs/common';
import { Manager } from './manager.model';
import { AccountsService } from 'src/accounts/accounts.service';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class ManagersService {
    constructor(private readonly accountsService: AccountsService) {}

    private readonly filePath = path.resolve('./src/managers/managers.json');

    private readManager(): Manager[] {
        const data = fs.readFileSync(this.filePath, 'utf8');
        return JSON.parse(data) as Manager[];
    }

    private writeManager(accounts: Manager[]): void {
        fs.writeFileSync(this.filePath, JSON.stringify(accounts, null, 2), 'utf8')
    }

    createManager(name: string, accountsList: number[]): Manager {
        const manager = this.readManager();
        const accounts = this.accountsService.readAccounts();

        //VALIDANDO PARA VER SE A CONTA EXISTE
        const validAccounts = accountsList.filter(accountId => 
            accounts.find(account => account.id === accountId)
        );

        //AGORA USANDO OS VALIDADOS PARA ATUALIZAR AS INFORMAÇÕES DE GERENTE NAS CONTAS
        validAccounts.forEach(accountId => {
            const account = accounts.find(account => account.id === Number(accountId));
            account.idManager = manager.length > 0 ? manager[manager.length - 1].id + 1 : 1,
            this.accountsService.writeAccounts(accounts)
        });

        const newManager = new Manager(
            manager.length > 0 ? manager[manager.length - 1].id + 1 : 1,
            name,
            validAccounts
        );

        manager.push(newManager);
        this.writeManager(manager);
        return newManager
    }

    updateManager(id: number, accountsList: number[]): Manager {
        const managers = this.readManager();
        const manager = managers.find(manager => manager.id === Number(id));
        const accounts = this.accountsService.readAccounts();

        //VALIDANDO PARA VER SE A CONTA EXISTE
        const validAccounts = accountsList.filter(accountId => 
            accounts.find(account => account.id === accountId)
        );

        //AGORA USANDO OS VALIDADOS PARA ATUALIZAR AS INFORMAÇÕES DE GERENTE NAS CONTAS
        validAccounts.forEach(accountId => {
            const account = accounts.find(account => account.id === Number(accountId));
            account.idManager = Number(id),
            this.accountsService.writeAccounts(accounts)
        });


        manager.idAccounts = validAccounts;
        this.writeManager(managers);

        return manager
    }

    removeManager(id: number): void {
        const managers = this.readManager();
        const managerIndex = managers.findIndex(manager => manager.id === Number(id));
        managers.splice(managerIndex, 1);
        this.writeManager(managers)
    }
}
