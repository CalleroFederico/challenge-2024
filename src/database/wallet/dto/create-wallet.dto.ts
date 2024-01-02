import {
  IsString,
  MaxLength,
  MinLength,
  IsNotEmpty,
  IsBoolean,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWalletDto {
  @ApiProperty({
    example: '0x7f1502605A2f2Cc01f9f4E7dd55e549954A8cD0C',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(42)
  @MinLength(42)
  address: string;

  @ApiProperty({
    example: false,
    required: true,
  })
  @IsBoolean()
  @IsOptional()
  favorite: boolean;

  @ApiProperty({
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  old: boolean;

  @ApiProperty({
    example: '1',
    required: false,
  })
  @IsOptional()
  @IsString()
  balance: number;
}
