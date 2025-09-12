import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { PetService } from './pet.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { PetResponse, PetsResponse } from './pet.model';
import { BaseResolver } from 'src/shared/base/base.resolver';

@ApiTags('🐱 Pet')
@Controller('pets')
export class PetController extends BaseResolver {
  constructor(private readonly petService: PetService) {
    super();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new pet' })
  @ApiResponse({
    status: 201,
    description: 'The pet has been successfully created.',
    type: PetResponse,
  })
  async create(@Body() dto: CreatePetDto) {
    const pet = await this.petService.save(dto);
    return this.wrapSuccess({ pet });
  }

  @Get()
  @ApiOperation({ summary: 'Get all pets' })
  @ApiResponse({
    status: 200,
    description: 'Return all pets.',
    type: PetsResponse,
  })
  async findAll() {
    const pets = await this.petService.findAll();

    return this.wrapSuccess({ pets });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a pet by id' })
  @ApiParam({
    name: 'id',
    description: 'Pet ID',
    format: 'uuid',

    example: 'c7c30028-a47e-425b-a42a-3970f81999c7',
  })
  @ApiResponse({
    status: 200,
    description: 'Return the pet.',
    type: PetResponse,
  })
  async findOne(@Param('id') id: string) {
    const pet = await this.petService.findOne({ where: { id } });
    return this.wrapSuccess({ pet });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a pet' })
  @ApiParam({
    name: 'id',
    description: 'Pet ID',
    format: 'uuid',

    example: 'c7c30028-a47e-425b-a42a-3970f81999c7',
  })
  @ApiResponse({
    status: 200,
    description: 'The pet has been successfully updated.',
    type: PetResponse,
  })
  async update(@Param('id') id: string, @Body() dto: UpdatePetDto) {
    const pet = await this.petService.findOne({ where: { id } });

    if (!pet) {
      throw new BadRequestException(this.wrapFail('Pet not found'));
    }

    await this.petService.update(id, dto);

    const updatedPet = await this.petService.findOne({ where: { id } });
    return this.wrapSuccess({ updatedPet });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a pet' })
  @ApiParam({
    name: 'id',
    description: 'Pet ID',
    format: 'uuid',
    example: 'c7c30028-a47e-425b-a42a-3970f81999c7',
  })
  @ApiResponse({
    status: 200,
    description: 'The pet has been successfully deleted.',
    type: PetResponse,
  })
  async delete(@Param('id') id: string) {
    const pet = await this.petService.findOne({ where: { id } });

    if (!pet) {
      throw new BadRequestException(this.wrapFail('Pet not found'));
    }

    await this.petService.delete(id);
    return this.wrapSuccess({ pet });
  }
}
