import { ForeignKey, HasMany } from 'sequelize-typescript';
import { Car } from './../cars/cars.model';
import {
  Table,
  Model,
  Column,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';
import {
  InfoUserData,
  InfoRouteData,
  TransportData,
  StatusData,
  SheduleData,
} from './orders.interface';
import { Shedule } from 'src/shedules/shedules.model';

interface OrderCreateAttrs {
  firstName: string;
  surName: string;
  lastName: string;
  phone: string;
  email: string;
  social: string;
  name: string;
  start: string;
  end: string;
  description: string;
  addRequirements: string;
  value: string;
  lastModified: string;
}

@Table({ tableName: 'orders' })
export class Order extends Model<Order, OrderCreateAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING })
  firstName: string;

  @Column({ type: DataType.STRING })
  surName: string;

  @Column({ type: DataType.STRING })
  lastName: string;

  @Column({ type: DataType.STRING })
  phone: string;

  @Column({ type: DataType.STRING })
  email: string;

  @Column({ type: DataType.STRING })
  social: string;

  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.STRING })
  start: string;

  @Column({ type: DataType.STRING })
  end: string;

  @Column({ type: DataType.STRING })
  description: string;

  @Column({ type: DataType.STRING })
  addRequirements: string;

  @Column({ type: DataType.STRING })
  value: string;

  @Column({ type: DataType.STRING })
  lastModified: string;

  @HasMany(() => Car, 'id')
  cars: Car[];

  @HasMany(() => Shedule, 'id')
  shedules: Shedule[];
}
