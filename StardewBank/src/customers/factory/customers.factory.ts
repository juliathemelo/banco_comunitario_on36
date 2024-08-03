import { Customer } from "../model/customer.model";

export class CustomerFactory {
    static createCustomer(
        id: number,
        name: string,
        age: number,
        accounts: number[]
    ): Customer {
        return new Customer(id, name, age, accounts);
    }
}