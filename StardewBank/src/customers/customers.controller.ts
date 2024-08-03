import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Customer } from './model/customer.model';
import { CustomersService } from './customers.service';

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
