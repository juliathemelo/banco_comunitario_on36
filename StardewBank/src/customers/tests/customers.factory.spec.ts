import { CustomerFactory } from '../factory/customers.factory';
import { Customer } from '../model/customer.model';

describe('CustomerFactory', () => {
    it('should create a new Customer instance', () => {
      // Arrange
      const id = 1;
      const name = 'John Doe';
      const age = 30;
      const accounts = [1001, 1002];
  
      const expectedCustomer = new Customer(id, name, age, accounts);
  
      // Act
      const result = CustomerFactory.createCustomer(id, name, age, accounts);
  
      // Assert
      expect(result).toStrictEqual(expectedCustomer);
      expect(result.id).toBe(id);
      expect(result.name).toBe(name);
      expect(result.age).toBe(age);
      expect(result.accounts).toBe(accounts);
    });
  });