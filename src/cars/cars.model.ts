import { Order } from './../orders/orders.model';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

interface CarCreationAttrs {
  kind: string;
  mark: string;
  model: string;
  vin: string;
  numberOfPassengers: number;
}

@Table({ tableName: 'cars' })
export class Car extends Model<Car, CarCreationAttrs> {
  @ForeignKey(() => Order)
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  kind: string;

  @Column({ type: DataType.STRING, allowNull: false })
  mark: string;

  @Column({ type: DataType.STRING, allowNull: false })
  model: string;

  @Column({ type: DataType.STRING, allowNull: false })
  vin: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  numberOfPassengers: string;
}
