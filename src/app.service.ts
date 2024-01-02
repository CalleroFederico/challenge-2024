import { Injectable } from '@nestjs/common';
import { CreateWalletDto } from './database/wallet/dto/create-wallet.dto';
import { UpdateWalletDto } from './database/wallet/dto/update-wallet.dto';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { WalletService } from './database/wallet/wallet.service';

@Injectable()
export class AppService {
  constructor(
    private readonly httpService: HttpService,
    private readonly walletService: WalletService,
  ) {}
  callHttp = async (url) => {
    const { data } = await firstValueFrom(
      this.httpService.get(url).pipe(
        catchError((error: AxiosError) => {
          console.log(error.response.data);
          throw 'An error happened!';
        }),
      ),
    );
    return data;
  };

  async getBalance(id: string): Promise<any> {
    const url = `https://api.etherscan.io/api?module=account&action=balance&address=${id}&tag=latest&apikey=NSZCD6S4TKVWRS13PMQFMVTNP6H7NAGHUY`;
    const balance = await this.callHttp(url);
    return { balance: balance.result };
  }

  async getFirstTx(id: string): Promise<any> {
    const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${id}&startblock=0&endblock=99999999&sort=asc&apikey=NSZCD6S4TKVWRS13PMQFMVTNP6H7NAGHUY`;
    const txList = await this.callHttp(url);
    return { firstTx: txList?.result?.[0]?.timeStamp };
  }

  getAge(timeStamp: number): boolean {
    return Math.floor(Date.now() / 1000) - 31536000 > timeStamp;
  }

  async getRate(from: string, to: string): Promise<any> {
    const url = `https://min-api.cryptocompare.com/data/price?fsym=${from}&tsyms=${to}`;
    const rates = await this.callHttp(url);
    return rates;
  }

  async getWallets(): Promise<any> {
    const wallets = await this.walletService.findAll();
    return wallets;
  }

  async createWallet(createWalletDto: CreateWalletDto): Promise<any> {
    const { balance } = await this.getBalance(createWalletDto.address);
    const firstTx = await this.getFirstTx(createWalletDto.address);
    const old = this.getAge(firstTx.firstTx);
    createWalletDto = {
      ...createWalletDto,
      favorite: false,
      balance,
      old,
    };
    await this.walletService.create(createWalletDto);
    return;
  }

  async favoriteWallet(address: string): Promise<any> {
    const { favorite } = await this.walletService.findOne(address);
    return await this.walletService.update(address, { favorite: !favorite });
  }

  async updateWallet(updateWalletDto: UpdateWalletDto): Promise<any> {
    return await this.walletService.update(
      updateWalletDto.address,
      updateWalletDto,
    );
  }

  async deleteWallet(address: string): Promise<any> {
    return await this.walletService.remove(address);
  }
}
