import { Usuario } from "./Usuário/usuario.js";
//Simulando a criação de um novo cliente
const cliente = new Usuario("Julia de Melo", "uuid01", 22, "Recife", "81123123");
//Criando duas contas para esse cliente
const contaCorrente = cliente.criarContaCorrente("uuid01", 1000, 500);
const contaPoupanca = cliente.criarContaPoupanca("uuid01", 1000, 0.003);
//Validação de operações
contaCorrente.depositar(100);
console.log(`Saldo Conta Corrente: ${contaCorrente.saldo}`);
contaCorrente.sacar(100);
console.log(`Saldo Conta Corrente: ${contaCorrente.saldo}`);
contaCorrente.transferir(400, contaPoupanca);
console.log(`Saldo Conta Corrente: ${contaCorrente.saldo}`);
console.log(`Saldo Conta Poupança: ${contaPoupanca.saldo}`);
//Validando erros
contaPoupanca.sacar(5000);
console.log(`Saldo Conta Poupança: ${contaPoupanca.saldo}`);
//Operação com taxa de juros de mês em mês
const agora = new Date();
const diaAtual = agora.getDate(); // Obtém o dia do mês atual (1 a 31)
if (diaAtual === 15) { //voce pode mudar o dia para o seu atual, e dessa forma consegue visualizar a operação
    // Multiplicando o saldo pela taxa de juros
    const saldoAntes = contaPoupanca.saldo;
    const taxaJuros = contaPoupanca.taxaJuros;
    contaPoupanca.saldo *= (1 + taxaJuros);
    console.log(`Saldo anterior: ${saldoAntes}`);
    console.log(`Saldo atual após aplicação da taxa de juros: ${contaPoupanca.saldo}`);
}
else {
    console.log("Hoje não é dia 1 do mês");
}
