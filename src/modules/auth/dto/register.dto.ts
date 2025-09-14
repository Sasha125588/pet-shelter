import { IsEmail, IsNotEmpty, Length, MaxLength } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RegisterRequstDto {
  @ApiProperty({
    description: 'Username',
    example: 'Test',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  username: string;

  @ApiProperty({
    description: 'Email',
    example: 'test@gmail.com',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password',
    example: 'test123',
    minLength: 6,
    maxLength: 128,
  })
  @IsString()
  @IsNotEmpty()
  @Length(6, 128)
  password: string;
}
