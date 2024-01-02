import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { HttpModule } from '@nestjs/axios';

import { WalletModule } from './database/wallet/wallet.module';
import { WalletService } from './database/wallet/wallet.service';
import { dataBaseConfig } from './database/database.config';
import { SequelizeModule } from '@nestjs/sequelize';
import { WalletController } from './database/wallet/wallet.controller';
import { Wallet } from './database/wallet/entities/wallet.entity';

@Module({
  imports: [
    WalletModule,
    SequelizeModule.forFeature([Wallet]),
    SequelizeModule.forRoot(dataBaseConfig),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'front/build'),
      exclude: ['/api/(.*)'],
    }),
    HttpModule,
  ],
  controllers: [AppController, WalletController],
  providers: [AppService, WalletService],
})
export class AppModule {}
