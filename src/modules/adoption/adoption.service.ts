import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/shared/base/base.service';
import { Adoption } from './entities/adoption.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAdoptionDto } from './dto/create-adoption.dto';

@Injectable()
export class AdoptionService extends BaseService<Adoption> {
  constructor(
    @InjectRepository(Adoption)
    private readonly adoptionRepository: Repository<Adoption>,
  ) {
    super(adoptionRepository);
  }
}
