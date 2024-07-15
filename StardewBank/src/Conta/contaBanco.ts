export interface ContaBanco {
  idCliente: string; //seria UUID na aplicação oficial
  saldo: number;

  sacar(valor: number): boolean;

  depositar(valor: number): void;

  transferir(valor: number, contaDestino: ContaBanco): boolean;
}