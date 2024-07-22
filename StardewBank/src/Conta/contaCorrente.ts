import { ContaBanco } from "./contaBanco.js";


export class ContaCorrente implements ContaBanco {
    idCliente: string; //seria UUID na aplicação oficial
    saldo: number;
    limiteChequeEspecial: number;

    constructor(idCliente: string, saldoInicial: number = 0, limiteChequeEspecial: number){
        this.idCliente = idCliente;
        this.saldo = saldoInicial;
        this.limiteChequeEspecial = limiteChequeEspecial;
    }

    sacar(valor: number): boolean {
        if (this.saldo + this.limiteChequeEspecial >= valor) {
            this.saldo -= valor;
            return true;
        } else {
            console.log("Saldo insuficiente na conta");
            return false;
        }
    }

    depositar(valor: number): void {
        this.saldo += valor;
    }

    transferir(valor: number, contaDestino: ContaBanco): boolean {
        if (this.sacar(valor)) {
            contaDestino.depositar(valor);
            return true;
        } else {
            console.log("Saldo insuficiente para transferencia");
            return false;
        }
    }
}