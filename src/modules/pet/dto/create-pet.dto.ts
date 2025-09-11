import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsOptional,
  IsPositive,
  IsString,
  Max,
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
  @Max(32)
  name: string;

  @ApiProperty({
    type: 'string',
    description: 'Pet description',
    example: 'Affectionate kitty',
    required: false,
  })
  @IsString()
  @Max(256)
  description: string;

  @ApiProperty({
    type: 'string',
    description: 'Pet sex',
    example: 'female',
  })
  @IsEnum({ enum: Sex })
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
