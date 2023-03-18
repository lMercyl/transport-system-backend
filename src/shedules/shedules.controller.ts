import { CreateSheduleDto } from './dto/create-shedule.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { ShedulesService } from './shedules.service';

@Controller('shedules')
export class ShedulesController {
  constructor(private shedulesService: ShedulesService) {}

  @Post()
  create(@Body() sheduleDto: CreateSheduleDto) {
    return this.shedulesService.createShedule(sheduleDto);
  }
}
