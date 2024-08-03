import { Injectable } from '@nestjs/common';
import { Manager } from './model/manager.model';
import { AccountsAdapter } from 'src/accounts/adapter/accounts.adapter';
import { ManagerAdapter } from './adapter/managers.adapter';
import { ManagerFactory } from './factory/managers.factory';

@Injectable()
export class ManagersService {

    private managerAdapter: ManagerAdapter;

    constructor(private readonly accountsAdapter: AccountsAdapter) {
        this.managerAdapter = new ManagerAdapter;
    };

    createManager(name: string, accountsList: number[]): Manager {
        const manager = this.managerAdapter.readManager();
        const accounts = this.accountsAdapter.readAccounts();
        const newId = manager.length > 0 ? manager[manager.length - 1].id + 1 : 1;

        //VALIDANDO PARA VER SE A CONTA EXISTE
        const validAccounts = accountsList.filter(accountId => 
            accounts.find(account => account.id === accountId)
        );

        //AGORA USANDO OS VALIDADOS PARA ATUALIZAR AS INFORMAÇÕES DE GERENTE NAS CONTAS
        validAccounts.forEach(accountId => {
            const account = accounts.find(account => account.id === Number(accountId));
            account.idManager = manager.length > 0 ? manager[manager.length - 1].id + 1 : 1,
            this.accountsAdapter.writeAccounts(accounts)
        });

        const newManager = ManagerFactory.createManager(newId, name, validAccounts);

        manager.push(newManager);
        this.managerAdapter.writeManager(manager);
        return newManager
    }

    updateManager(id: number, accountsList: number[]): Manager {
        const managers = this.managerAdapter.readManager();
        const manager = managers.find(manager => manager.id === Number(id));
        const accounts = this.accountsAdapter.readAccounts();

        //VALIDANDO PARA VER SE A CONTA EXISTE
        const validAccounts = accountsList.filter(accountId => 
            accounts.find(account => account.id === accountId)
        );

        //AGORA USANDO OS VALIDADOS PARA ATUALIZAR AS INFORMAÇÕES DE GERENTE NAS CONTAS
        validAccounts.forEach(accountId => {
            const account = accounts.find(account => account.id === Number(accountId));
            account.idManager = Number(id),
            this.accountsAdapter.writeAccounts(accounts)
        });


        manager.idAccounts = validAccounts;
        this.managerAdapter.writeManager(managers);

        return manager
    }

    removeManager(id: number): void {
        const managers = this.managerAdapter.readManager();
        const managerIndex = managers.findIndex(manager => manager.id === Number(id));
        managers.splice(managerIndex, 1);
        this.managerAdapter.writeManager(managers)
    }
}
