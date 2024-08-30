import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class UpdateCustomerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  age: number;

  @IsNumber()
  @IsNotEmpty()
  cep: number;
}
