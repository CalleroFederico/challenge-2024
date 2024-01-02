import { Column, Table, Model, Default } from 'sequelize-typescript';

@Table({
  tableName: 'wallet',
})
export class Wallet extends Model {
  @Default(false)
  @Column({ allowNull: false, unique: true })
  address: string;

  @Default(false)
  @Column({ allowNull: false })
  favorite: boolean;

  @Column({ allowNull: false })
  balance: string;

  @Column({ allowNull: false })
  old: boolean;
}
