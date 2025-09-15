import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { PetService } from './pet.service';
import { CreatePetDto, GetPetsDto, UpdatePetDto } from './dto';
import { PetResponse, PetsResponse } from './pet.model';
import { BaseResolver } from 'src/shared/base/base.resolver';
import { SortOrder } from 'src/shared/types/sort-order';

@ApiTags('🐱 Pets')
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
  async create(@Body() CreatePetDto: CreatePetDto) {
    const pet = await this.petService.save(CreatePetDto);
    return this.wrapSuccess({ pet });
  }

  @Get()
  @ApiOperation({ summary: 'Get all pets' })
  @ApiResponse({
    status: 200,
    description: 'Return all pets.',
    type: PetsResponse,
  })
  async findAll(@Query() getPetsDto: GetPetsDto) {
    const { name, status, sort } = getPetsDto;

    const query = this.petService.createQueryBuilder('pet');

    if (name) {
      query.andWhere('pet.name ILIKE :name', {
        name: `%${name}%`,
      });
    }
    if (status) {
      query.andWhere('pet.status = :status', { status: status });
    }
    query.addOrderBy('pet.created_at', sort ?? SortOrder.DESC);

    const pets = await query.getMany();
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
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
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
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() UpdatePetDto: UpdatePetDto,
  ) {
    const pet = await this.petService.findOne({ where: { id } });

    if (!pet) {
      throw new BadRequestException(this.wrapFail('Pet not found'));
    }

    await this.petService.update(id, UpdatePetDto);

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
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    const pet = await this.petService.findOne({ where: { id } });

    if (!pet) {
      throw new BadRequestException(this.wrapFail('Pet not found'));
    }

    await this.petService.delete(id);
    return this.wrapSuccess({ pet });
  }
}
