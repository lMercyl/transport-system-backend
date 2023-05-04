import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateQrcodeDto } from './dto/create-qrcode.dto';
import { Qrcode } from './qrcode.model';
import { QRCodeToDataURLOptions, toDataURL } from 'qrcode';

@Injectable()
export class QrcodeService {
  constructor(@InjectModel(Qrcode) private qrcodeRepository: typeof Qrcode) {}

  async createQrcode(dto: CreateQrcodeDto) {
    const options: QRCodeToDataURLOptions = {
      errorCorrectionLevel: 'L',
      type: 'image/svg',
      width: 200,
      margin: 1,
    };
    const qrCodeImageUrl = await toDataURL(dto.data, options);
    console.log(qrCodeImageUrl);
    const qrcode = await this.qrcodeRepository.create({
      code: qrCodeImageUrl,
      orderId: dto.orderId,
    });
    return qrcode;
  }
}
