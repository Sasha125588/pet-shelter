import { ApiProperty } from '@nestjs/swagger';

export class AuthResponse {
  @ApiProperty({
    description: 'JWT acces token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp...',
  })
  accesToken: string;
}
