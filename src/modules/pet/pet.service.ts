import { Injectable } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { BaseService } from 'src/shared/base/base.service';
import { Pet } from './entities/pet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PetService extends BaseService<Pet> {
  constructor(
    @InjectRepository(Pet) private readonly petRepository: Repository<Pet>,
  ) {
    super(petRepository);
  }

  async create(dto: CreatePetDto) {
    const pet = this.petRepository.create(dto);

    await this.petRepository.save(pet);

    return pet;
  }
}
