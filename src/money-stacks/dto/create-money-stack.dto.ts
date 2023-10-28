import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateMoneyStackDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsOptional()
  description!: string;

  @IsNumber()
  @IsNotEmpty()
  initialAmount!: number;
}