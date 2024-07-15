export class ContaCorrente {
    constructor(idCliente, saldoInicial = 0, limiteChequeEspecial) {
        this.idCliente = idCliente;
        this.saldo = saldoInicial;
        this.limiteChequeEspecial = limiteChequeEspecial;
    }
    sacar(valor) {
        if (this.saldo + this.limiteChequeEspecial >= valor) {
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
