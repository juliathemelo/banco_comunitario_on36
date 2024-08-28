import { Customer } from '../../domain/customer.model';
import * as path from 'path';
import * as fs from 'fs';
const axios = require('axios');

export class CustomersRepository {
    private readonly filePath = path.resolve('./src/customers/adapters/outbound/customers.json');

    public readCustomers(): Customer[] {
        const data = fs.readFileSync(this.filePath, 'utf8');
        return JSON.parse(data) as Customer[]
    }

    public writeCustomers(customer: Customer[]): void {
        fs.writeFileSync(this.filePath, JSON.stringify(customer, null, 2), 'utf8')
    }

    async getEstadoByCep(cep: number): Promise<string> {
        try {
            const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
            
            if (response.data.erro) {
                throw new Error('CEP inválido.');
            }
            
            return response.data.uf;
        } catch (error) {
            console.error(`Erro ao verificar o CEP: ${error.message}`);
            throw error;
        }
    }
}