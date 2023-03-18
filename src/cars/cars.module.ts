import { SequelizeModule } from '@nestjs/sequelize';
import { Car } from './cars.model';
import { Module } from '@nestjs/common';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';

@Module({
  controllers: [CarsController],
  providers: [CarsService],
  imports: [SequelizeModule.forFeature([Car])],
  exports: [CarsService],
})
export class CarsModule {}
