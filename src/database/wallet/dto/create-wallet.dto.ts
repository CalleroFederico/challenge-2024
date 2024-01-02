import {
  IsString,
  MaxLength,
  MinLength,
  IsNotEmpty,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class CreateWalletDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(42)
  @MinLength(42)
  address: string;

  @IsBoolean()
  @IsOptional()
  favorite: boolean;

  @IsOptional()
  @IsBoolean()
  old: boolean;

  @IsOptional()
  @IsString()
  balance: number;
}
