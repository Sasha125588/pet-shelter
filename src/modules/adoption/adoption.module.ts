import { Module } from '@nestjs/common';
import { AdoptionService } from './adoption.service';
import { AdoptionController } from './adoption.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Adoption } from './entities/adoption.entity';
import { PetModule } from '../pet/pet.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Adoption]), PetModule, UserModule],
  controllers: [AdoptionController],
  providers: [AdoptionService],
})
export class AdoptionModule {}
