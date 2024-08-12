import { Body, Controller, Get, Post } from '@nestjs/common';
import { Customer } from 'src/customers/domain/customer.model';
import { CustomersService } from 'src/customers/application/customers.service';

@Controller('customers')
export class CustomersController {
    constructor(private readonly customerService: CustomersService) {

    }

    @Post()
    createCustomer(@Body('name') name: string, @Body('age')  age: number): Customer {
        return this.customerService.createCustomer(name, age);
    }

    @Get()
    findAllCustomers(): Customer[] {
        return this.customerService.findAllCustomers();
    }
}
