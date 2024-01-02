import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post()
  create(@Body() createWalletDto: CreateWalletDto) {
    return this.walletService.create(createWalletDto);
  }

  @Get()
  findAll() {
    return this.walletService.findAll();
  }

  @Get(':address')
  findOne(@Param('address') address: string) {
    return this.walletService.findOne(address);
  }

  @Patch(':address')
  update(
    @Param('address') address: string,
    @Body() updateWalletDto: UpdateWalletDto,
  ) {
    return this.walletService.update(address, updateWalletDto);
  }

  @Delete(':address')
  remove(@Param('address') address: string) {
    return this.walletService.remove(address);
  }
}
