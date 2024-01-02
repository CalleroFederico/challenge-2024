import { ApiProperty } from '@nestjs/swagger';
import { CreateWalletDto } from './database/wallet/dto/create-wallet.dto';

export class BalanceResponse {
  @ApiProperty({ example: '1' })
  balance: string;
}

export class AgeResponse {
  @ApiProperty({ example: '1678581647' })
  firstTx: string;
}

export class RateResponse {
  @ApiProperty({ example: '2386' })
  USD: number;

  @ApiProperty({ example: '2163' })
  EUR: number;
}

export class GetWalletsResponse {
  @ApiProperty({
    example: [
      {
        id: 1,
        address: '0x7f1502605A2f2Cc01f9f4E7dd55e549954A8cD0C',
        favorite: true,
        balance: '120874384253871532194383',
        old: false,
        createdAt: '2024-01-02T06:27:42.586Z',
        updatedAt: '2024-01-02T17:58:01.922Z',
      },
    ],
  })
  list: Array<CreateWalletDto>;
}
