import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterRequstDto, LoginRequestDto } from './dto';
import type { Request, Response } from 'express';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AuthResponse } from './auth.model';
import { BaseResolver } from 'src/shared/base/base.resolver';
import { UseJwtAuth } from './jwt';

@Controller('auth')
export class AuthController extends BaseResolver {
  constructor(private readonly authService: AuthService) {
    super();
  }

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
    const accessToken = await this.authService.register(res, RegisterRequstDto);
    return this.wrapSuccess({ accessToken });
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
    const accessToken = await this.authService.login(res, LoginRequestDto);
    return this.wrapSuccess({ accessToken });
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
    const tokens = await this.authService.refresh(req, res);
    return this.wrapSuccess({ tokens });
  }

  @ApiOperation({
    summary: 'User logout',
  })
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Res({ passthrough: true }) res: Response) {
    const isSuccess = await this.authService.logout(res);
    return this.wrapSuccess(isSuccess);
  }

  // @ApiOperation({
  //   summary: 'Get current user',
  //   description: 'Returns information about the currently authenticated user',
  // })
  // @ApiBearerAuth()
  // @UseJwtAuth()
  // @Get('@me')
  // @HttpCode(HttpStatus.OK)
  // me(@Req() req: Request) {
  //   const user = req.user;
  //   return this.wrapSuccess({ user });
  // }
}
