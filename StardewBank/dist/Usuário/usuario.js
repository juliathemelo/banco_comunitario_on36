import { ContaCorrente } from "../Conta/contaCorrente.js";
import { ContaPoupanca } from "../Conta/contaPoupanca.js";
export class Usuario {
    constructor(nome, id, idade, endereco, telefone) {
        this.nome = nome;
        this.id = id;
        this.idade = idade;
        this.endereco = endereco;
        this.telefone = telefone;
        this.contas = [];
    }
    adicionarConta(conta) {
        this.contas.push(conta);
    }
    criarContaCorrente(idCliente, saldoInicial = 0, limiteChequeEspecial = 0) {
        const conta = new ContaCorrente(idCliente, saldoInicial, limiteChequeEspecial);
        this.adicionarConta(conta);
        return conta;
    }
    criarContaPoupanca(idCliente, saldoInicial = 0, taxaJuros = 0) {
        const conta = new ContaPoupanca(idCliente, saldoInicial, taxaJuros);
        this.adicionarConta(conta);
        return conta;
    }
}
