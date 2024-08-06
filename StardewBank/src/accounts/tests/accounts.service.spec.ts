import { Test, TestingModule } from '@nestjs/testing';
import { AccountsService } from '../accounts.service';
import { CustomersService } from '../../customers/customers.service';
import * as fs from 'fs';
import * as path from 'path';
import { AccountType } from '../enums/accounts.type';
import { AccountsAdapter } from '../adapter/accounts.adapter';
import { SavingAccount } from '../model/savingAccount.model';
import { CurrentAccount } from '../model/currentAccount.model';

describe('AccountsService', () => {
  let service: AccountsService;
  let customersService: CustomersService;
  let accountAdapter: AccountsAdapter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountsService,
        {
          provide: CustomersService,
          useValue: {
            customerExists: jest.fn(),
          },
        },
        {
          provide: AccountsAdapter,
          useValue: {
            readAccounts: jest.fn(),
            writeAccounts: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AccountsService>(AccountsService);
    customersService = module.get<CustomersService>(CustomersService);
    accountAdapter = module.get<AccountsAdapter>(AccountsAdapter);
  });

  let idClient = 1;
  let idManager = 1;
  let balance = 1000;
  let specificProperty = 2;

  test('should return all accounts', () => {
    const filePath = path.resolve('./src/accounts/data/accounts.json');
    const fileData = fs.readFileSync(filePath, 'utf8');
    const accounts = JSON.parse(fileData);

    const result = service.findAllAccounts();

    expect(result).toStrictEqual(accounts);
  });

  test('should create a new saving account', () => {
    jest.spyOn(customersService, 'customerExists').mockReturnValue(true);
    jest.spyOn(accountAdapter, 'readAccounts').mockReturnValue([]);

    const filePath = path.resolve('./src/accounts/data/accounts.json');
    const fileData = fs.readFileSync(filePath, 'utf8');
    const accounts = JSON.parse(fileData);
    const lastAccount = accounts[accounts.length - 1];

    const expectedAccount = new SavingAccount(lastAccount.id + 1, idClient, idManager, balance, specificProperty);

    const result = service.createAccount(idClient, idManager, balance, AccountType.SAVING, specificProperty);

    expect(result).toStrictEqual(expectedAccount);
  });

  test('should create a new current account', () => {
    jest.spyOn(customersService, 'customerExists').mockReturnValue(true);
    jest.spyOn(accountAdapter, 'readAccounts').mockReturnValue([]);

    const filePath = path.resolve('./src/accounts/data/accounts.json');
    const fileData = fs.readFileSync(filePath, 'utf8');
    const accounts = JSON.parse(fileData);
    const lastAccount = accounts[accounts.length - 1];

    const expectedAccount = new CurrentAccount(lastAccount.id + 1, idClient, idManager, balance, specificProperty);

    const result = service.createAccount(idClient, idManager, balance, AccountType.CURRENT, specificProperty);

    expect(result).toStrictEqual(expectedAccount);
  });

  test('should update an existing account', () => {
    
    jest.spyOn(customersService, 'customerExists').mockReturnValue(true);
    const oldAccount = service.createAccount(idClient, idManager, balance, AccountType.CURRENT, specificProperty);

    const filePath = path.resolve('./src/accounts/data/accounts.json');
    const fileData = fs.readFileSync(filePath, 'utf8');
    const accounts = JSON.parse(fileData);
    const lastAccount = accounts[accounts.length - 1];

    const expectedAccount = new CurrentAccount(lastAccount.id, idClient, idManager, balance, specificProperty);

    const result = service.updateAccount(lastAccount.id, AccountType.CURRENT, balance, specificProperty);

    expect(result).toStrictEqual(expectedAccount);

    jest.spyOn(accountAdapter, 'readAccounts').mockReturnValue([oldAccount]);

    const updatedAccounts = accountAdapter.readAccounts();
    expect(updatedAccounts).toContainEqual(expectedAccount);
  });

  test('should remove an account', () => {
    
    jest.spyOn(customersService, 'customerExists').mockReturnValue(true);
    const accountRemove = service.createAccount(idClient, idManager, balance, AccountType.CURRENT, specificProperty);

    const result = service.removeAccount(accountRemove.id);

    expect(result).toStrictEqual(undefined);
  });
});