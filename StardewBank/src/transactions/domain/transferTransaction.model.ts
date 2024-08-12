import { Transaction } from "../domain/transaction.model";
import { TransactionType } from "./transactions.type";

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