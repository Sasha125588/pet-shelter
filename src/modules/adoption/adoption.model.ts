import { BaseResponse } from 'src/shared/base/base.model';
import { ApiProperty } from '@nestjs/swagger';
import { Adoption as Adoption } from './entities/adoption.entity';

export class AdoptionResponse extends BaseResponse {
  @ApiProperty({
    description: 'Adoption',
    type: Adoption,
  })
  adoption: Adoption;
}

export class AdoptionsResponse extends BaseResponse {
  @ApiProperty({
    description: 'Adoptions',
    type: [Adoption],
  })
  adoptions: Adoption[];
}
