import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { AdoptionStatus } from '../entities/adoption.entity';
import { CreateAdoptionDto } from './create-adoption.dto';

export class UpdateAdoptionDto extends PartialType(CreateAdoptionDto) {
  @ApiProperty({
    description: 'New status of the adoption application',
    enum: AdoptionStatus,
    example: AdoptionStatus.APPROVED,
  })
  @IsEnum(AdoptionStatus)
  status: AdoptionStatus;
}
