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
    const order = await this.orderRepository.create({
      userId: Number(dto.userId),
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
    const shedulePromises = infoRoute.shedules.map((shedule) =>
      this.shedulesService.createShedule({ orderId: order.id, ...shedule }),
    );
    const carPromises = infoTransports.map((car) =>
      this.carsService.createCar({ orderId: order.id, ...car }),
    );
    const [shedules, cars] = await Promise.all([
      Promise.all(shedulePromises),
      Promise.all(carPromises),
    ]);
    return order;
  }

  async getAllOrders() {
    const orders = await this.orderRepository.findAll({
      include: { all: true },
    });
    return orders;
  }

  async getAllOrdersByUserId(id: number) {
    const orders = await this.orderRepository.findAll({
      include: {
        where: {
          userId: id,
        },
        all: true,
      },
    });
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
