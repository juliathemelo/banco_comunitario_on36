import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { AccountEntity } from '../../accounts/entities/account.entity';

export class CreateManagerDto {
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    name: string;


    idAccounts: AccountEntity[];
}
