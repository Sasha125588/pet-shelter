import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { AdoptionStatus } from '../entities/adoption.entity';

export class UpdateAdoptionStatusDto {
  @ApiProperty({
    description: 'New status of the adoption application',
    enum: AdoptionStatus,
    example: AdoptionStatus.APPROVED,
  })
  @IsEnum(AdoptionStatus)
  status: AdoptionStatus;
}
