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

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  //External API calls
  @Get('balance/:id')
  getBalance(@Param('id') id: string) {
    return this.appService.getBalance(id);
  }

  @Get('age/:id')
  getFirstTx(@Param('id') id: string) {
    return this.appService.getFirstTx(id);
  }

  @Get('rate/:from/:to')
  getExchangeRate(@Param('from') from: string, @Param('to') to: string) {
    return this.appService.getRate(from, to);
  }

  //DB calls
  @Get('all')
  getWallets() {
    return this.appService.getWallets();
  }

  @Post('create')
  addWallet(@Body() createWalletDto: CreateWalletDto) {
    return this.appService.createWallet(createWalletDto);
  }

  @Patch('favorite/:id')
  favoriteWallet(@Param('id') id: string) {
    return this.appService.favoriteWallet(id);
  }

  @Put('edit/:id')
  updateWallet(@Body() updateWalletDto: UpdateWalletDto) {
    return this.appService.updateWallet(updateWalletDto);
  }

  @Delete('delete/:id')
  deleteWallet(@Param() id: string) {
    return this.appService.deleteWallet(id);
  }
}
