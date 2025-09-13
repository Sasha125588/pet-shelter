import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterRequstDto } from './dto/register.dto';
import { LoginRequestDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() RegisterRequstDto: RegisterRequstDto) {
    return await this.authService.register(RegisterRequstDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() LoginRequestDto: LoginRequestDto) {
    return await this.authService.login(LoginRequestDto);
  }
}
