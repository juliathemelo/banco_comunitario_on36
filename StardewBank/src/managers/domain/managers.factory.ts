import { Manager } from "./manager.model";

export class ManagerFactory {
    static createManager(
        id: number,
        name: string,
        idAccounts: number[]
    ): Manager {
        return new Manager(id, name, idAccounts);
    }
}