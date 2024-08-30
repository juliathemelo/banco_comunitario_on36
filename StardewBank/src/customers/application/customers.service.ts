import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerEntity } from '../entities/customers.entities';
import { UpdateCustomerDto } from '../dto/update-customer.dto';
import { UtilsAdapter } from '../../utils/utils.adapter';
import { CreateCustomerDto } from '../dto/create-customer.dto';


@Injectable()
export class CustomersService {

    constructor(
        @InjectRepository(CustomerEntity)
        private readonly customersRepository: Repository<CustomerEntity>,
    ) {}

    private utilsAdapter = new UtilsAdapter()

    //Criação cliente
    async createCustomer(createCustomerDto: CreateCustomerDto): Promise<CustomerEntity> {
        const statue = this.utilsAdapter.getEstadoByCep(Number(createCustomerDto.cep))
        let newCustomer;

        if (this.utilsAdapter.allowedStates.includes((await statue))) {
            newCustomer = this.customersRepository.create(createCustomerDto);
            await this.customersRepository.save(newCustomer);
        } else {
            throw new NotFoundException(`Cep: ${createCustomerDto.cep} não pertence a região brasileira`);
        }

        return newCustomer;
    }

    async findAllCustomers(): Promise<CustomerEntity[]> {
        return await this.customersRepository.find();
    }

    async updateCustomer(id: string, updateCustomerDto: UpdateCustomerDto): Promise<CustomerEntity> {
   
        const customer = await this.customersRepository.findOne({ where: { id } });
        if (!customer) {
          throw new NotFoundException(`Customer with ID ${id} not found`);
        }

        const statue = this.utilsAdapter.getEstadoByCep(Number(updateCustomerDto.cep))
        if (this.utilsAdapter.allowedStates.includes((await statue))) {
            customer.name = updateCustomerDto.name;
            customer.age = updateCustomerDto.age;
            customer.cep = updateCustomerDto.cep;
            await this.customersRepository.save(customer);
        } else {
            throw new NotFoundException(`Cep: ${updateCustomerDto.cep} não pertence a região brasileira`);
        }
    
    
        // Salva as alterações no banco de dados
        return customer
      }

    async customerExists(id: string): Promise<boolean> {
        const customer = await this.customersRepository.findOne({ where: { id } });
        let existCustomer = false

        if (!customer) {
            throw new Error(`Customer with id ${id} not found`);
        } else {
            existCustomer = true
        }

        return existCustomer
    }
}
