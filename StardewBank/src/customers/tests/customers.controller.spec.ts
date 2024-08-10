import { Test, TestingModule } from '@nestjs/testing';
import { CustomersController } from '../customers.controller';
import { INestApplication } from '@nestjs/common';
import { CustomersService } from '../customers.service';
import { Customer } from '../model/customer.model';
import { AppModule } from '../../app.module';
import * as supertest from 'supertest';

describe('CustomersController', () => {
  let controller: CustomersController;
  let customersService: CustomersService;
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      controllers: [CustomersController],
      providers: [
        {
          provide: CustomersService,
          useValue: {
            createCustomer: jest.fn((name: string, age: number) => {
              return new Customer(1, name, age, []);
            }),
          },
        },
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();
    controller = module.get<CustomersController>(CustomersController);
    customersService = module.get<CustomersService>(CustomersService);
  });

  test('should create a new customer and return it', () => {
    const name = 'name';
    const age = 33;
    const accounts = [];

    return supertest(app.getHttpServer()).post('/customers').send({
      name,
      age,
      accounts
    }).expect(201).expect(({ body }) => {
      expect(body.name).toBe(name);
      expect(body.age).toBe(age);
      expect(body.accounts).toEqual(accounts);
    })
  });
});
