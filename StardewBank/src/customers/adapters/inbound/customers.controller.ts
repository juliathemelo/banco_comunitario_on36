import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CustomersService } from '../../application/customers.service';
import { CustomerEntity } from '../../entities/customers.entities';
import { CreateCustomerDto } from '../../dto/create-customer.dto';
import { UpdateCustomerDto } from 'src/customers/dto/update-customer.dto';

@Controller('customers')
export class CustomersController {
    constructor(private readonly customerService: CustomersService) {

    }

    @Post()
    createCustomer(@Body() createCustomerDto: CreateCustomerDto): Promise<CustomerEntity> {
        return this.customerService.createCustomer(createCustomerDto);
    }

    @Get()
    findAllCustomers(): Promise<CustomerEntity[]> {
        return this.customerService.findAllCustomers();
    }

    @Patch(':id/updateCustomer')
    updateCustomer(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto,): Promise<CustomerEntity> {
        return this.customerService.updateCustomer(id, updateCustomerDto);
    }
}
