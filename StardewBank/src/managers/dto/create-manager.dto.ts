import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateManagerDto {
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    name: string;


    idAccounts: number[];
}
