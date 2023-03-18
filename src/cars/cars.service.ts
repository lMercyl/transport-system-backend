import { CreateCarDto } from './dto/create-car.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Car } from './cars.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CarsService {
  constructor(@InjectModel(Car) private carsRepository: typeof Car) {}

  async createCar(dto: CreateCarDto) {
    const car = await this.carsRepository.create(dto);
    return car;
  }
}
