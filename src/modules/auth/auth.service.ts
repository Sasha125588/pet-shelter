import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { hash, verify } from 'argon2';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import type { LoginRequestDto, RegisterRequstDto } from './dto';
import type { Request, Response } from 'express';
import { isDev } from 'src/shared/utils/is-dev';

@Injectable()
export class AuthService {
  private readonly JWT_ACCESS_TOKEN_TTL: string;
  private readonly JWT_REFRESH_TOKEN_TTL: string;
  private readonly COOKIE_DOMAIN: string;

  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    this.JWT_ACCESS_TOKEN_TTL = configService.getOrThrow(
      'JWT_ACCESS_TOKEN_TTL',
    );
    this.JWT_REFRESH_TOKEN_TTL = configService.getOrThrow(
      'JWT_REFRESH_TOKEN_TTL',
    );
    this.COOKIE_DOMAIN = configService.getOrThrow('COOKIE_DOMAIN');
  }

  async register(res: Response, RegisterRequstDto: RegisterRequstDto) {
    const { username, email, password } = RegisterRequstDto;

    const existingUser = await this.userService.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const user = await this.userService.save({
      username,
      email,
      password: await hash(password),
    });

    return this.auth(res, user.id);
  }

  async login(res: Response, LoginRequestDto: LoginRequestDto) {
    const { email, password } = LoginRequestDto;

    const user = await this.userService.findOne({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isValidPassword = await verify(user.password, password);

    if (!isValidPassword) {
      throw new NotFoundException('Invalid password');
    }

    return this.auth(res, user.id);
  }

  async refresh(req: Request, res: Response) {
    const refreshToken = req.cookies['refreshToken'];

    if (!refreshToken) throw new UnauthorizedException('Invalid refresh token');

    const payload: { id: string } =
      await this.jwtService.verifyAsync(refreshToken);

    if (!payload) throw new UnauthorizedException('Invalid refresh token');

    const user = await this.userService.findOne({
      where: {
        id: payload.id,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.auth(res, user.id);
  }

  async logout(res: Response) {
    this.setCookie(res, 'refreshToken', new Date(0));

    return true;
  }

  private auth(res: Response, id: string) {
    const { accessToken, refreshToken } = this.generateTokens(id);

    this.setCookie(
      res,
      refreshToken,
      new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    );

    return accessToken;
  }

  private generateTokens(id: string) {
    const payload: { id: string } = { id };

    const accessToken = this.jwtService.sign(payload as object, {
      expiresIn: this.JWT_ACCESS_TOKEN_TTL,
    });

    const refreshToken = this.jwtService.sign(payload as object, {
      expiresIn: this.JWT_REFRESH_TOKEN_TTL,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  private setCookie(res: Response, value: string, expires: Date) {
    res.cookie('refreshToken', value, {
      httpOnly: true,
      domain: this.COOKIE_DOMAIN,
      expires,
      secure: !isDev(this.configService),
      sameSite: isDev ? 'none' : 'lax',
    });
  }

  async validate(id: string) {
    const user = await this.userService.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
