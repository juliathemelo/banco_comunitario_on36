import { AccountType } from "../enums/accounts.type";

export class Account {
    constructor(
        public id: number,
        public idClient: number,
        public idManager: number,
        public type: AccountType,
        public balance: number
    ) {}
}