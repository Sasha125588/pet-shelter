import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../jwt';

export const Authorization = () => {
  return applyDecorators(UseGuards(JwtGuard));
};
