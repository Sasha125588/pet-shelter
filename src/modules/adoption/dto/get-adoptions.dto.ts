import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { AdoptionStatus } from '../entities/adoption.entity';
import { Transform } from 'class-transformer';
import { SortOrder } from 'src/shared/types/sort-order';
export class GetAdoptionsDto {
  @ApiProperty({
    description: 'Filter by pet name',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'Filter by status',
    enum: AdoptionStatus,
    example: AdoptionStatus.PENDING,
    required: false,
  })
  @IsOptional()
  @IsEnum(AdoptionStatus)
  status?: AdoptionStatus;

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
