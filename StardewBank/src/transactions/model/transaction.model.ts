import { TransactionType } from "../enum/transactions.type";

export class Transaction {
    constructor(
        public id: number,
        public idConta: number,
        public type: TransactionType,
        public movementMoney: number
    ) {}
}