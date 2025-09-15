import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { PetStatus } from '../entities/pet.entity';
import { SortOrder } from 'src/shared/types/sort-order';

export class GetPetsDto {
  @ApiProperty({
    description: 'Filter by pet name',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'Filter by status',
    enum: PetStatus,
    example: PetStatus.AVAILABLE,
    required: false,
  })
  @IsOptional()
  @IsEnum(PetStatus)
  status?: PetStatus;

  @ApiProperty({
    description: 'Sort order for creation date',
    enum: SortOrder,
    default: SortOrder.DESC,
    required: false,
  })
  @IsOptional()
  @IsEnum(SortOrder)
  @Transform(({ value }) => value?.toUpperCase())
  sort?: SortOrder;
}
