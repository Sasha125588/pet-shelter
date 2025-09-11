import { BaseResponse } from 'src/shared/base/base.model';
import { Pet } from './entities/pet.entity';
import { ApiProperty } from '@nestjs/swagger';

export class PetResponse extends BaseResponse {
  @ApiProperty({ description: 'Pet', type: Pet })
  pet: Pet;
}

export class PetsResponse extends BaseResponse {
  @ApiProperty({ description: 'Pets', type: [Pet] })
  pets: Pet[];
}
