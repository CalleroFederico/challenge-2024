import { Injectable } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Wallet } from './entities/wallet.entity';

@Injectable()
export class WalletService {
  constructor(
    @InjectModel(Wallet)
    private walletRepository: typeof Wallet,
  ) {}
  async create(createWalletDto: CreateWalletDto) {
    //.sync() guarantees table creation on first call, if one exists, does nothing
    await Wallet.sync();
    return this.walletRepository.create(createWalletDto as any);
  }

  async findAll() {
    await Wallet.sync();
    return this.walletRepository.findAll();
  }

  async findOne(address: string) {
    await Wallet.sync();
    return this.walletRepository.findOne({ where: { address } });
  }

  async update(address: string, updateWalletDto: UpdateWalletDto) {
    await Wallet.sync();
    return await Wallet.update({ ...updateWalletDto }, { where: { address } });
  }

  async remove(address: any) {
    await Wallet.sync();
    const wallet = await this.walletRepository.findOne(address);
    return await wallet.destroy();
  }
}
