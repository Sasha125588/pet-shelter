import { Controller, Get, HttpCode, HttpStatus, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UseJwtAuth } from '../auth/jwt';
import { BaseResolver } from 'src/shared/base';
import { Request } from 'express';

@ApiTags('🙎‍♀️🙎‍♂️Users')
@Controller('users')
export class UserController extends BaseResolver {
  constructor(private readonly userService: UserService) {
    super();
  }

  @ApiOperation({
    summary: 'Get user profile',
    description: 'Returns information about the currently authenticated user',
  })
  @ApiBearerAuth()
  @UseJwtAuth()
  @Get('@me')
  @HttpCode(HttpStatus.OK)
  profile(@Req() req: Request) {
    return this.wrapSuccess({ user: req.user });
  }
}
