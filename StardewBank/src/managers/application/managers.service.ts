import { Injectable } from '@nestjs/common';
import { Manager } from '../domain/manager.model';
import { AccountsRepository } from '../../accounts/adapters/outbound/accounts.repository';
import { ManagerFactory } from '../domain/managers.factory';
import { ManagerRepository } from '../adapters/outbound/managers.repository';

@Injectable()
export class ManagersService {

    private managerRepository: ManagerRepository;

    constructor(private readonly accountsRepository: AccountsRepository) {
        this.managerRepository = new ManagerRepository;
    };

    createManager(name: string, accountsList: number[]): Manager {
        const manager = this.managerRepository.readManager();
        const accounts = this.accountsRepository.readAccounts();
        const newId = manager.length > 0 ? manager[manager.length - 1].id + 1 : 1;

        //VALIDANDO PARA VER SE A CONTA EXISTE
        const validAccounts = accountsList.filter(accountId => 
            accounts.find(account => account.id === accountId)
        );

        //AGORA USANDO OS VALIDADOS PARA ATUALIZAR AS INFORMAÇÕES DE GERENTE NAS CONTAS
        validAccounts.forEach(accountId => {
            const account = accounts.find(account => account.id === Number(accountId));
            account.idManager = manager.length > 0 ? manager[manager.length - 1].id + 1 : 1,
            this.accountsRepository.writeAccounts(accounts)
        });

        const newManager = ManagerFactory.createManager(newId, name, validAccounts);

        manager.push(newManager);
        this.managerRepository.writeManager(manager);
        return newManager
    }

    updateManager(id: number, accountsList: number[]): Manager {
        const managers = this.managerRepository.readManager();
        const manager = managers.find(manager => manager.id === Number(id));
        const accounts = this.accountsRepository.readAccounts();

        //VALIDANDO PARA VER SE A CONTA EXISTE
        const validAccounts = accountsList.filter(accountId => 
            accounts.find(account => account.id === accountId)
        );

        //AGORA USANDO OS VALIDADOS PARA ATUALIZAR AS INFORMAÇÕES DE GERENTE NAS CONTAS
        validAccounts.forEach(accountId => {
            const account = accounts.find(account => account.id === Number(accountId));
            account.idManager = Number(id),
            this.accountsRepository.writeAccounts(accounts)
        });


        manager.idAccounts = validAccounts;
        this.managerRepository.writeManager(managers);

        return manager
    }

    removeManager(id: number): void {
        const managers = this.managerRepository.readManager();
        const managerIndex = managers.findIndex(manager => manager.id === Number(id));
        managers.splice(managerIndex, 1);
        this.managerRepository.writeManager(managers)
    }
}
