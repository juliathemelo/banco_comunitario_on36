import { Test, TestingModule } from '@nestjs/testing';
import { ManagersController } from '../managers.controller';
import { INestApplication } from '@nestjs/common';
import { ManagersService } from '../managers.service';
import { AppModule } from '../../app.module';
import * as supertest from 'supertest';
import { Manager } from '../model/manager.model';

describe('ManagersController', () => {
  let controller: ManagersController;
  let managerService: ManagersService;
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      controllers: [ManagersController],
      providers: [
        {
          provide: ManagersService,
          useValue: {
            createManager: jest.fn((name: string) => {
              return new Manager(1, name, []);
            }),
            updateManager: jest.fn((id: number, name: string, accounts: number[]) => {
              return new Manager(id, name, accounts);
            }),
          },
        },
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();
    controller = module.get<ManagersController>(ManagersController);
    managerService = module.get<ManagersService>(ManagersService);
  });

  test('should create a new manager and return it', () => {
    const name = 'name';
    const accounts = [];

    return supertest(app.getHttpServer()).post('/managers').send({
      name,
      accounts
    }).expect(201).expect(({ body }) => {
      expect(body.name).toBe(name);
      expect(body.idAccounts).toEqual(accounts);
    })
  });

  test('should update a manager and return it', async () => {
    const id = 1;  // Assuming a manager with ID 1 exists
    const updatedName = 'Updated Name';
    const updatedAccounts = [1];

    const updatedManager = new Manager(id, updatedName, updatedAccounts);

    jest.spyOn(managerService, 'updateManager').mockImplementation(() => updatedManager);

    return supertest(app.getHttpServer())
      .patch(`/managers/${id}`)
      .send({ name: updatedName, accounts: updatedAccounts })
      .expect(200)
      .expect(({ body }) => {
        expect(body.id).toBe("1");
      })
  });
});
