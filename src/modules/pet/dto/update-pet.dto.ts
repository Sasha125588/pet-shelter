import { PartialType } from '@nestjs/mapped-types';
import { CreatePetDto } from './create-pet.dto';
import { PetStatus } from '../entities/pet.entity';
import { IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePetDto extends PartialType(CreatePetDto) {
  @ApiProperty({
    type: 'string',
    enum: PetStatus,
    description: 'Status of animal',
    example: 'available',
    required: false,
  })
  @IsEnum(PetStatus, {
    message: 'Status must be one of: "available", "pending", or "adopted"',
  })
  @IsOptional()
  status: PetStatus;
}
