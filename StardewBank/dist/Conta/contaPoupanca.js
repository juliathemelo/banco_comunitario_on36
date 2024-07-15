export class ContaPoupanca {
    constructor(idCliente, saldoInicial = 0, taxaJuros = 0) {
        this.idCliente = idCliente;
        this.saldo = saldoInicial;
        this.taxaJuros = taxaJuros; //fiz um esquema no index com a taxa de juros
    }
    sacar(valor) {
        if (this.saldo >= valor) {
            this.saldo -= valor;
            return true;
        }
        else {
            console.log("Saldo insuficiente na conta");
            return false;
        }
    }
    depositar(valor) {
        this.saldo += valor;
    }
    transferir(valor, contaDestino) {
        if (this.sacar(valor)) {
            contaDestino.depositar(valor);
            return true;
        }
        else {
            console.log("Saldo insuficiente para transferencia");
            return false;
        }
    }
}
