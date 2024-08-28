import { Test, TestingModule } from '@nestjs/testing';
import { ManagersService } from '../managers.service';
import * as fs from 'fs';
import * as path from 'path';
import { Manager } from '../domain/manager.model';
import { AccountsAdapter } from '../../accounts/adapters/outbound/accounts.repository';
import { AccountType } from '../../accounts/domain/accounts.type';

describe('ManagersService', () => {
  let service: ManagersService;
  let accountsAdapter: AccountsAdapter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManagersService,
        {
          provide: AccountsAdapter,
          useValue: {
            readAccounts: jest.fn(),
            writeAccounts: jest.fn(),
          },
        }
      ],
      
    }).compile();

    service = module.get<ManagersService>(ManagersService);
    accountsAdapter = module.get<AccountsAdapter>(AccountsAdapter);
  });

  let name = "dolores"
  let idAccounts = [1]

  test('should create a manager', () => {

    const filePath = path.resolve('./src/managers/data/managers.json');
    const fileData = fs.readFileSync(filePath, 'utf8');
    const manager = JSON.parse(fileData);
    const lastManager = manager[manager.length - 1];

    const mockAccounts = [
      { id: 1, idClient: 1, idManager: 1, type: AccountType.CURRENT, balance: 1000, limit: 20}
    ];

    jest.spyOn(accountsAdapter, 'readAccounts').mockReturnValue(mockAccounts);

    const expectedAccount = new Manager(lastManager.id + 1, name, idAccounts);

    const result = service.createManager(name, idAccounts);

    expect(result).toStrictEqual(expectedAccount);
  });

  test('should update an existing manager', () => {

    const mockAccounts = [
      { id: 1, idClient: 1, idManager: 1, type: AccountType.CURRENT, balance: 1000, limit: 20}
    ];

    jest.spyOn(accountsAdapter, 'readAccounts').mockReturnValue(mockAccounts);

    const newManager = service.createManager(name, idAccounts);

    const expectedManager = {id: newManager.id, name: newManager.name, idAccounts: []}

    const result = service.updateManager(newManager.id, []);

    expect(result).toStrictEqual(expectedManager);
  });

  test('should remove a manager', () => {

    const mockAccounts = [
      { id: 1, idClient: 1, idManager: 1, type: AccountType.CURRENT, balance: 1000, limit: 20}
    ];

    jest.spyOn(accountsAdapter, 'readAccounts').mockReturnValue(mockAccounts);
    
    const newManager = service.createManager(name, idAccounts);

    const result = service.removeManager(newManager.id);

    expect(result).toStrictEqual(undefined);
  });
});
