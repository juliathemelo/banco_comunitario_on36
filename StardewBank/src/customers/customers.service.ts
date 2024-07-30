import { Injectable } from '@nestjs/common';
import { Customer } from './model/customer.model';
import { CustomersAdapter } from './adapter/customers.adapter';
import { CustomerFactory } from './factory/customers.factory';


@Injectable()
export class CustomersService {

    private readonly customersAdapter = new CustomersAdapter();

    //Criação cliente
    createCustomer(name: string, age: number): Customer {

        const customers = this.customersAdapter.readCustomers();
        const newId = customers.length > 0 ? customers[customers.length - 1].id + 1 : 1;

        const newCustomer = CustomerFactory.createCustomer(newId, name, age, []);

        customers.push(newCustomer);
        this.customersAdapter.writeCustomers(customers);

        return newCustomer;
    }

    findAllCustomers(): Customer[] {
        const customers = this.customersAdapter.readCustomers();
        return customers;
    }

    customerExists(id: number): boolean {
        const customers = this.customersAdapter.readCustomers();
        return customers.some(customer => customer.id === id);
    }
}
