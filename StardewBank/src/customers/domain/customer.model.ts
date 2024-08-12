export class Customer {
    constructor(
        public id: number,
        public name: string,
        public age: number,
        public cep: number,
        public accounts: number[]
    ) {}
}