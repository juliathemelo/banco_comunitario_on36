import { Injectable, NotFoundException } from '@nestjs/common';
import { Customer } from '../domain/customer.model';
import { CustomersRepository } from '../adapters/outbound/customers.repository';
import { CustomerFactory } from '../domain/customers.factory';


@Injectable()
export class CustomersService {

    private readonly customersRepository = new CustomersRepository();

    //Criação cliente
    async createCustomer(name: string, age: number, cep: number): Promise<Customer> {

        const customers = this.customersRepository.readCustomers();
        const newId = customers.length > 0 ? customers[customers.length - 1].id + 1 : 1;

        let newCustomer: Customer
        
        const statue = this.customersRepository.getEstadoByCep(cep)

        //depois vou arrumar em um arquivo com todas as ufs
        const allowedStates = ['PE', 'BA', 'SP'];

        //verificação com a chamada a api externa
        if (allowedStates.includes((await statue))) {
            const newCustomer = CustomerFactory.createCustomer(newId, name, age, cep, []);
            customers.push(newCustomer);
            this.customersRepository.writeCustomers(customers);
        } else {
            throw new NotFoundException(`Cep: ${cep} não pertence a região brasileira`);
        }

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
