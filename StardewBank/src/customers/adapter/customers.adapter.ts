import { Customer } from '../model/customer.model';
import * as path from 'path';
import * as fs from 'fs';

export class CustomersAdapter {
    private readonly filePath = path.resolve('./src/customers/data/customers.json');

    public readCustomers(): Customer[] {
        const data = fs.readFileSync(this.filePath, 'utf8');
        return JSON.parse(data) as Customer[]
    }

    public writeCustomers(customer: Customer[]): void {
        fs.writeFileSync(this.filePath, JSON.stringify(customer, null, 2), 'utf8')
    }
}