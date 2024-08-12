import { Injectable } from '@nestjs/common';
import { Customer } from '../domain/customer.model';
import { CustomersRepository } from '../adapters/outbound/customers.repository';
import { CustomerFactory } from '../domain/customers.factory';


@Injectable()
export class CustomersService {

    private readonly customersRepository = new CustomersRepository();

    //Criação cliente
    createCustomer(name: string, age: number): Customer {

        const customers = this.customersRepository.readCustomers();
        const newId = customers.length > 0 ? customers[customers.length - 1].id + 1 : 1;

        const newCustomer = CustomerFactory.createCustomer(newId, name, age, []);

        customers.push(newCustomer);
        this.customersRepository.writeCustomers(customers);

        return newCustomer;
    }

    findAllCustomers(): Customer[] {
        const customers = this.customersRepository.readCustomers();
        return customers;
    }

    customerExists(id: number): boolean {
        const customers = this.customersRepository.readCustomers();
        return customers.some(customer => customer.id === id);
    }
}
