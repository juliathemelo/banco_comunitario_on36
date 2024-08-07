import { Transaction } from "./transaction.model";
import { TransactionType } from "../enum/transactions.type";

export class transferTransaction extends Transaction {
constructor(
    id: number,
    idConta: number,
    movementMoney: number,
    public idAccountReceive: number // Propriedade adicional para contas de corrente (juros)
) {
    super(id, idConta, TransactionType.TRANSFER, movementMoney);
}
}