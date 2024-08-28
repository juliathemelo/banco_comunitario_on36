import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateManagerDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    idAccounts: number[];
}
