import { ContaBanco } from "./contaBanco.js";

export class ContaPoupanca implements ContaBanco {
    idCliente: string; //seria UUID na aplicação oficial
    saldo: number;
    taxaJuros: number;
  
    constructor(idCliente: string, saldoInicial: number = 0, taxaJuros: number = 0) {
      this.idCliente = idCliente;
      this.saldo = saldoInicial;
      this.taxaJuros = taxaJuros; //fiz um esquema no index com a taxa de juros
    }
  
    sacar(valor: number): boolean {
      if (this.saldo >= valor) {
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