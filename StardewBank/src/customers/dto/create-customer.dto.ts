import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { AccountEntity } from '../../accounts/entities/account.entity';

export class CreateCustomerDto {
    @IsNotEmpty()
    id: string;

    @IsString()
    name: string;

    @IsNumber()
    age: number;

    @IsNumber()
    cep: number;

    @IsArray()
    accounts: AccountEntity[];
}