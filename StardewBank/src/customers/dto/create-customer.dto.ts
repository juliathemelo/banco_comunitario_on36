import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

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
    accounts: number[];
}