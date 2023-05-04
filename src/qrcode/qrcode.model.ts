import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Order } from 'src/orders/orders.model';

interface QrcodeCreationAttrs {
  code: string;
  orderId: number;
}

@Table({ tableName: 'qrcodes' })
export class Qrcode extends Model<Qrcode, QrcodeCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  code: string;

  @ForeignKey(() => Order)
  @Column({
    type: DataType.INTEGER,
  })
  orderId: number;
}
