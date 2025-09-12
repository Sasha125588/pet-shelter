import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsOptional,
  IsPositive,
  IsString,
  Length,
  Max,
  MaxLength,
} from 'class-validator';
import { Sex } from '../entities/pet.entity';

export class CreatePetDto {
  @ApiProperty({
    type: 'string',
    description: 'Name of pet',
    example: 'Bobik',
    required: true,
  })
  @IsString()
  @MaxLength(32, {
    message: 'Name must not be longer than 32 characters',
  })
  name: string;

  @ApiProperty({
    type: 'string',
    description: 'Pet description',
    example: 'Affectionate kitty',
    required: false,
  })
  @IsString()
  @MaxLength(256, {
    message: 'Description must not be longer than 256 characters',
  })
  description: string;

  @ApiProperty({
    type: 'string',
    description: 'Pet sex',
    example: 'female',
  })
  @IsEnum(Sex, { message: 'Sex must be either "male" or "female"' })
  sex: Sex;

  @ApiProperty({
    type: 'number',
    description: 'Pet age',
    example: '1.6',
  })
  @IsPositive()
  @IsOptional()
  age: number;

  @ApiProperty({
    type: 'string',
    description: 'Pet breed',
    example: 'British Shorthair',
    required: false,
  })
  @IsString()
  @IsOptional()
  breed: string;

  @ApiProperty({
    type: [String],
    description: 'Array of photo URLs for the pet',
    example: ['https://example.com/dog.jpg', 'https://example.com/dog2.jpg'],
    required: false,
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  photoUrls: string[];
}
