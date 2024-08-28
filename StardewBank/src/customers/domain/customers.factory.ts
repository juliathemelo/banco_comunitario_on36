import { Customer } from "../domain/customer.model";

export class CustomerFactory {
    static createCustomer(
        id: string,
        name: string,
        age: number,
        cep: number,
        accounts: number[]
    ): Customer {
        return new Customer(id, name, age, cep, accounts);
    }
}