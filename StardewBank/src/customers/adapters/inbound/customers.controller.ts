import { Body, Controller, Get, Post } from '@nestjs/common';
import { Customer } from 'src/customers/domain/customer.model';
import { CustomersService } from 'src/customers/application/customers.service';

@Controller('customers')
export class CustomersController {
    constructor(private readonly customerService: CustomersService) {

    }

    @Post()
    createCustomer(@Body('name') name: string, @Body('age') age: number,@Body('cep')  cep: number): Promise<Customer> {
        return this.customerService.createCustomer(name, age, cep);
    }

    @Get()
    findAllCustomers(): Customer[] {
        return this.customerService.findAllCustomers();
    }
}
