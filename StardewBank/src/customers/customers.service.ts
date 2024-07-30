import { Injectable } from '@nestjs/common';
import { Customer } from './customer.model';
import * as path from 'path';
import * as fs from 'fs';


@Injectable()
export class CustomersService {
    private readonly filePath = path.resolve('./src/customers/customers.json');

    private readCustomers(): Customer[] {
        const data = fs.readFileSync(this.filePath, 'utf8');
        return JSON.parse(data) as Customer[]
    }

    private writeCustomers(customer: Customer[]): void {
        fs.writeFileSync(this.filePath, JSON.stringify(customer, null, 2), 'utf8')
    }

    //Criação cliente
    createCustomer(name: string, age: number): Customer {
        const customers = this.readCustomers();

        const newCustomer = {
            id: customers.length > 0 ? customers[customers.length - 1].id + 1 : 1,
            name,
            age,
            accounts: []
        }
        customers.push(newCustomer);
        this.writeCustomers(customers);
        return newCustomer;
    }

    //Consultar Clientes no geral
    findAllCustomers(): Customer[] {
        const customers = this.readCustomers();
        return customers;
    }

    //Função de verificação, se o cliente existe
    customerExists(id: number): boolean {
        const customers = this.readCustomers();
        return customers.some(customer => customer.id === id);
    }
}
