import { Qrcode } from './qrcode.model';
import { QrcodeService } from './qrcode.service';
import { QrcodeController } from './qrcode.controller';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  controllers: [QrcodeController],
  providers: [QrcodeService],
  imports: [SequelizeModule.forFeature([Qrcode])],
  exports: [QrcodeService],
})
export class QrcodeModule {}
