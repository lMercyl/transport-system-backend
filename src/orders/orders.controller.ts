import { CreateOrderDto } from './dto/create-order';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';

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
}
