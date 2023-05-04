import { JwtAuthGuard } from './jwt-auth.guard';
import {
  Body,
  Controller,
  Post,
  Get,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(@Body() userDto: CreateUserDto, @Response() res) {
    const { token } = await this.authService.login(userDto);
    res.status(200).cookie('jwt', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 3600 * 1000, // время жизни куки - 1 час
      path: '/',
      domain: 'localhost',
    });
    res.json({ token });
  }

  @Post('/registration')
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }

  @Get('/me')
  async checkAuth(@Request() req): Promise<boolean> {
    const isUser = this.authService.verifyToken(req.cookies.jwt);
    return isUser;
  }

  @Get('/info')
  async getInfoUser(@Request() req) {
    const user = this.authService.getInfoUser(req.cookies.jwt);
    return user;
  }
}
