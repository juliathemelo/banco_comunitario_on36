import { Test, TestingModule } from '@nestjs/testing';
import { CustomersService } from '../customers.service';
import * as fs from 'fs';
import * as path from 'path';
import { Customer } from '../model/customer.model';


describe('CustomersService', () => {
  let service: CustomersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomersService],
    }).compile();

    service = module.get<CustomersService>(CustomersService);
  });

  let name = "jose";
  let age = 22;
  let accounts = [];

  test('should return all customers', () => {
    const filePath = path.resolve('./src/customers/data/customers.json');
    const fileData = fs.readFileSync(filePath, 'utf8');
    const customers = JSON.parse(fileData);

    const result = service.findAllCustomers();

    expect(result).toStrictEqual(customers);
  });

  test('should create a customer', () => {
    const filePath = path.resolve('./src/customers/data/customers.json');
    const fileData = fs.readFileSync(filePath, 'utf8');
    const customer = JSON.parse(fileData);
    const lastCustomer = customer[customer.length - 1];

    const expectedAccount = new Customer(lastCustomer.id + 1, name, age, accounts);

    const result = service.createCustomer(name, age);

    expect(result).toStrictEqual(expectedAccount);
  });
});
