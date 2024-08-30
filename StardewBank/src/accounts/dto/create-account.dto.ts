import { IsNotEmpty, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { AccountType } from '../domain/accounts.type';
import { CustomerEntity } from '../../customers/entities/customers.entities';
import { ManagerEntity } from '../../managers/entities/managers.entity';

export class CreateAccountDto {
    @IsNotEmpty()
    id: string;

    @IsNumber()
    balance: number;

    idClient: CustomerEntity;

    idManager: ManagerEntity;

    @IsOptional()
    interest?: number;

    @IsOptional()
    @IsNumber()
    limit?: number;

    @IsEnum(AccountType)
    accountType: AccountType;
}
