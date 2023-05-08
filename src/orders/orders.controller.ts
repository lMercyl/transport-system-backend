import { CreateOrderDto } from './dto/create-order';
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from 'sequelize';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  create(@Body() orderDto: CreateOrderDto) {
    return this.ordersService.createOrder(orderDto);
  }

  @Get()
  getAll() {
    return this.ordersService.getAllOrders();
  }

  @Get('/:id')
  getOrder(@Param('id') id: string) {
    return this.ordersService.getOrderById(Number(id));
  }

  @Get('/user/:id')
  getOrdersByUser(@Param('id') id: string) {
    return this.ordersService.getAllOrdersByUserId(Number(id));
  }

  @Get()
  async getOrdersWithPagination(
    @Query('limit') limit: number,
    @Query('page') page: number,
    @Query('userId') userId: number,
  ) {
    const { orders, count, pages } =
      await this.ordersService.getOrdersByLimitAndPage(
        Number(limit),
        Number(page),
        Number(userId),
      );

    return { orders, count, pages };
  }
}
