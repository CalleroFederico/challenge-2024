import {
  Controller,
  Get,
  Put,
  Post,
  Delete,
  Patch,
  Param,
  Body,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateWalletDto } from './database/wallet/dto/create-wallet.dto';
import { UpdateWalletDto } from './database/wallet/dto/update-wallet.dto';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import {
  BalanceResponse,
  GetWalletsResponse,
  AgeResponse,
  RateResponse,
} from './app.responses';

@ApiTags('API')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  //External API calls
  @ApiOkResponse({ type: BalanceResponse })
  @Get('balance/:address')
  getBalance(@Param('address') address: string) {
    return this.appService.getBalance(address);
  }

  @ApiOkResponse({ type: AgeResponse })
  @Get('age/:address')
  getFirstTx(@Param('address') address: string) {
    return this.appService.getFirstTx(address);
  }

  @ApiOkResponse({ type: RateResponse })
  @Get('rate/:from/:to')
  getExchangeRate(@Param('from') from: string, @Param('to') to: string) {
    return this.appService.getRate(from, to);
  }

  //DB calls
  @ApiOkResponse({ type: GetWalletsResponse })
  @Get('all')
  async getWallets() {
    return { list: await this.appService.getWallets() };
  }

  @Post('create')
  addWallet(@Body() createWalletDto: CreateWalletDto) {
    return this.appService.createWallet(createWalletDto);
  }

  @Patch('favorite/:address')
  favoriteWallet(@Param('address') address: string) {
    return this.appService.favoriteWallet(address);
  }

  @Put('edit/:address')
  updateWallet(@Body() updateWalletDto: UpdateWalletDto) {
    return this.appService.updateWallet(updateWalletDto);
  }

  @Delete('delete/:address')
  deleteWallet(@Param() address: string) {
    return this.appService.deleteWallet(address);
  }
}
