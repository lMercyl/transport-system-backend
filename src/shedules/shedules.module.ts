import { Shedule } from './shedules.model';
import { ShedulesService } from './shedules.service';
import { ShedulesController } from './shedules.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';

@Module({
  controllers: [ShedulesController],
  providers: [ShedulesService],
  imports: [SequelizeModule.forFeature([Shedule])],
  exports: [ShedulesService],
})
export class ShedulesModule {}
