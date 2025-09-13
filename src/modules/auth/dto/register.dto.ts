import { IsEmail, IsNotEmpty, Length, MaxLength } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RegisterRequstDto {
  @ApiProperty({
    type: 'string',
    description: 'Username',
    example: 'Test',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  username: string;

  @ApiProperty({
    type: 'string',
    description: 'Email',
    example: 'test@gmail.com',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    type: 'string',
    description: 'Password',
    example: 'test123',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Length(6, 128)
  password: string;
}
