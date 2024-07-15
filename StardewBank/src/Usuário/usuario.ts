import { ContaBanco } from "../Conta/contaBanco.js";
import { ContaCorrente } from "../Conta/contaCorrente.js";
import { ContaPoupanca } from "../Conta/contaPoupanca.js";

export class Usuario {
    nome: string;
    id: string; //seria UUID na aplicação oficial
    idade: number;
    endereco: string;
    telefone: string;
    contas: ContaBanco[];
  
    constructor(nome: string, id: string, idade:number, endereco: string, telefone: string) {
        this.nome = nome;
        this.id = id;
        this.idade = idade
        this.endereco = endereco;
        this.telefone = telefone;
        this.contas = [];
    }
  
    adicionarConta(conta: ContaBanco): void {
      this.contas.push(conta);
    }

    criarContaCorrente(idCliente: string, saldoInicial: number = 0, limiteChequeEspecial: number = 0): ContaCorrente {
        const conta = new ContaCorrente(idCliente, saldoInicial, limiteChequeEspecial);
        this.adicionarConta(conta);
        return conta;
      }
    
      criarContaPoupanca(idCliente: string, saldoInicial: number = 0, taxaJuros: number = 0): ContaPoupanca {
        const conta = new ContaPoupanca(idCliente, saldoInicial, taxaJuros);
        this.adicionarConta(conta);
        return conta;
      }
  }