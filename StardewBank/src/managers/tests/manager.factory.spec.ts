import { ManagerFactory } from "../domain/managers.factory";
import { Manager } from "../domain/manager.model";

describe('CustomerFactory', () => {
    it('should create a new Customer instance', () => {
      // Arrange
      const id = 1;
      const name = 'dora';
      const accounts = [1001, 1002];
  
      const expectedCustomer = new Manager(id, name, accounts);
  
      // Act
      const result = ManagerFactory.createManager(id, name, accounts);
  
      // Assert
      expect(result).toStrictEqual(expectedCustomer);
      expect(result.id).toBe(id);
      expect(result.name).toBe(name);
      expect(result.idAccounts).toBe(accounts);
    });
  });