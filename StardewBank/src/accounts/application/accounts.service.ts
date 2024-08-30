import { Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from '../domain/account.model';
import { SavingAccount } from '../domain/savingAccount.model';
import { AccountType } from '../domain/accounts.type';
import { CustomersService } from '../../customers/application/customers.service';
import { CreateAccountDto } from '../dto/create-account.dto';
import { UpdateAccountDto } from '../dto/update-account.dto';
import { CurrentAccount } from '../domain/currentAccount.model';
import { AccountsRepository } from '../adapters/outbound/accounts.repository';
import { AccountFactory } from '../domain/accounts.factory';
import { AccountEntity } from '../entities/account.entity';

@Injectable()
export class AccountsService {

    constructor(
        @InjectRepository(AccountEntity)
        private readonly accountsRepository: Repository<AccountEntity>,
        private readonly customersService: CustomersService
    ) {}

    //Consultar Contas no geral
    async findAllAccounts(): Promise<AccountEntity[]> {
        return await this.accountsRepository.find();
    }

    //Criação conta
    async createAccount(createAccountDto: CreateAccountDto): Promise<AccountEntity> {

        let newAccount;

        if(this.customersService.customerExists(createAccountDto.idClient.id)) {
            newAccount = this.accountsRepository.create(createAccountDto);
            await this.accountsRepository.save(newAccount);
        } else {
            throw new NotFoundException(`Cliente com o ${createAccountDto.idClient} não existe`);
        }

        return newAccount
    }

    //atualização tipo de conta
    async updateAccount(id: string, updateAccountDto: UpdateAccountDto): Promise<AccountEntity> {

        const accounts = await this.accountsRepository.findOne({ where: { id } });
        if (!accounts) {
          throw new NotFoundException(`Customer with ID ${id} not found`);
        }
        
        accounts.balance = updateAccountDto.balance;
        if(updateAccountDto.accountType === AccountType.SAVING){
            accounts.interest = updateAccountDto.interest;
        } if(updateAccountDto.accountType === AccountType.CURRENT) {
            accounts.limit = updateAccountDto.limit;
        } else {
            throw new NotFoundException(`Account type não existe`);
        }
        
        await this.accountsRepository.save(accounts);

        return accounts
    }

    async removeAccount(id: string): Promise<void> {
        const account = await this.accountsRepository.findOne({ where: { id } });
        await this.accountsRepository.remove(account)
    }
}
