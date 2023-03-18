import { CarsModule } from './../cars/cars.module';
import { ShedulesModule } from './../shedules/shedules.module';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './orders.model';
import { Module } from '@nestjs/common';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [SequelizeModule.forFeature([Order]), ShedulesModule, CarsModule],
  exports: [],
})
export class OrdersModule {}
