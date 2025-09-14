import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterRequstDto } from './dto/register.dto';
import { LoginRequestDto } from './dto/login.dto';
import type { Request, Response } from 'express';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AuthResponse } from './auth.model';
import { AuthGuard } from '@nestjs/passport';
import { Authorization } from './decorators/authorization.decorator';
import { Authorized } from './decorators/authorized.decorator';
import { User } from '../user/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Register new user',
    description: 'Create user account',
  })
  @ApiOkResponse({ type: AuthResponse })
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Res({ passthrough: true }) res: Response,
    @Body() RegisterRequstDto: RegisterRequstDto,
  ) {
    return await this.authService.register(res, RegisterRequstDto);
  }

  @ApiOperation({
    summary: 'User login',
    description: 'Authenticate and get refresh token',
  })
  @ApiOkResponse({ type: AuthResponse })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() LoginRequestDto: LoginRequestDto,
  ) {
    return await this.authService.login(res, LoginRequestDto);
  }

  @ApiOperation({
    summary: 'Refresh tokens',
    description: 'Generate new refresh token',
  })
  @ApiOkResponse({ type: AuthResponse })
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.authService.refresh(req, res);
  }

  @ApiOperation({
    summary: 'User logout',
  })
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Res({ passthrough: true }) res: Response) {
    return await this.authService.logout(res);
  }

  @ApiOperation({
    summary: 'Me',
  })
  @Authorization()
  @Get('@me')
  @HttpCode(HttpStatus.OK)
  me(@Authorized() user: User) {
    return user;
  }
}
