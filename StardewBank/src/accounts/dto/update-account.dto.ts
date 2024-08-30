import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { AccountType } from '../domain/accounts.type';

export class UpdateAccountDto {

    @IsNumber()
    balance: number;

    @IsOptional()
    @IsNumber()
    interest?: number;

    @IsOptional()
    @IsNumber()
    limit?: number;

    @IsEnum(AccountType)
    accountType: AccountType;
}
