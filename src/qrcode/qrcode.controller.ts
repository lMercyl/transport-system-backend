import { CreateQrcodeDto } from './dto/create-qrcode.dto';
import { CreateCarDto } from './../cars/dto/create-car.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { QrcodeService } from './qrcode.service';

@Controller('qrcodes')
export class QrcodeController {
  constructor(private qrcodeService: QrcodeService) {}

  @Post()
  create(@Body() qrcodeDto: CreateQrcodeDto) {
    return this.qrcodeService.createQrcode(qrcodeDto);
  }
}
