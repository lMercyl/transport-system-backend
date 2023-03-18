import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Order } from 'src/orders/orders.model';

interface SheduleCreationAttrs {
  time: string;
  name: string;
}

@Table({ tableName: 'shedules' })
export class Shedule extends Model<Shedule, SheduleCreationAttrs> {
  @ForeignKey(() => Order)
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  time: string;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;
}
