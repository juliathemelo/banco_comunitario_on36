export class Customer {
    constructor(
        public id: string,
        public name: string,
        public age: number,
        public cep: number,
        public accounts: number[]
    ) {}
}