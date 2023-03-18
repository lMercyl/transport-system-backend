import { CreateSheduleDto } from './dto/create-shedule.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Shedule } from './shedules.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ShedulesService {
  constructor(
    @InjectModel(Shedule) private shedulesRepository: typeof Shedule,
  ) {}

  async createShedule(dto: CreateSheduleDto) {
    const shedule = await this.shedulesRepository.create(dto);
    return shedule;
  }
}
