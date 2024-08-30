import { IsNotEmpty, IsString } from 'class-validator';
import { AccountEntity } from '../../accounts/entities/account.entity';

export class UpdateManagerDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    idAccounts: AccountEntity[];
}
