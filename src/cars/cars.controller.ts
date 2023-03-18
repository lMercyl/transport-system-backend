import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('cars')
export class CarsController {
  constructor(private carsService: CarsService) {}

  @Post()
  create(@Body() carsDto: CreateCarDto) {
    return this.carsService.createCar(carsDto);
  }
}
