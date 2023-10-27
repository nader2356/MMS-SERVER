import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateTransactionDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsOptional()
  description!: string;

  @IsNumber()
  @IsNotEmpty()
  amount!: number;

  @IsString()
  @IsNotEmpty()
  moneyStackId!: string;
}