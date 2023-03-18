import { CarsService } from './../cars/cars.service';
import { ShedulesService } from './../shedules/shedules.service';
import { CreateOrderDto } from './dto/create-order';
import { Order } from './orders.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order) private orderRepository: typeof Order,
    private shedulesService: ShedulesService,
    private carsService: CarsService,
  ) {}

  async createOrder(dto: CreateOrderDto) {
    const { infoUser, infoRoute, infoTransports } = dto;
    for (let i = 0; i < infoRoute.shedules.length; i++) {
      await this.shedulesService.createShedule(infoRoute.shedules[i]);
    }
    for (let i = 0; i < infoTransports.length; i++) {
      await this.carsService.createCar(infoTransports[i]);
    }
    const order = await this.orderRepository.create({
      firstName: infoUser.firstName,
      surName: infoUser.firstName,
      lastName: infoUser.lastName,
      phone: infoUser.phone,
      email: infoUser.email,
      social: infoUser.social,
      name: infoRoute.name,
      start: infoRoute.start,
      end: infoRoute.end,
      description: infoRoute.descrption,
      addRequirements: dto.addRequirements,
      value: 'На рассмотрении',
      lastModified: new Date().toString(),
    });
    return order;
  }

  async getAllOrders() {
    const orders = await this.orderRepository.findAll({
      include: { all: true },
    });
    return orders;
  }

  async getOrderById(id: number) {
    const order = await this.orderRepository.findOne({
      where: { id },
      include: { all: true },
    });
    return {
      id: order.id,
      infoUser: {
        firstName: order.firstName,
        surName: order.surName,
        lastName: order.lastName,
        phone: order.phone,
        email: order.email,
        social: order.social,
      },
      infoRoute: {
        name: order.firstName,
        start: order.start,
        end: order.end,
        shedules: order.shedules
          ? [
              ...order.shedules.map((shedule) => ({
                name: shedule.name,
                time: shedule.time,
              })),
            ]
          : [],
        description: order.description,
      },
      infoTransports: order.cars
        ? [
            ...order.cars.map((car) => ({
              id: car.id,
              kind: car.kind,
              mark: car.mark,
              model: car.model,
              vin: car.vin,
              numberOfPassengers: car.numberOfPassengers,
            })),
          ]
        : [],
      addRequirements: order.addRequirements,
      status: {
        value: 'На рассмотрении',
        lastModified: '12.02.2023',
      },
    };
  }
}
