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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { PetService } from './pet.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { PetResponse, PetsResponse } from './pet.model';
import { BaseResolver } from 'src/shared/base/base.resolver';

@ApiTags('🐱 Pet')
@Controller('pet')
export class PetController extends BaseResolver {
  constructor(private readonly petService: PetService) {
    super();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new pet' })
  @ApiBody({ type: CreatePetDto })
  @ApiResponse({
    status: 201,
    description: 'The pet has been successfully created.',
    type: PetResponse,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.', type: PetResponse })
  async create(@Body() dto: CreatePetDto) {
    const pet = await this.petService.create(dto);
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
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Return the pet.',
    type: PetResponse,
  })
  @ApiResponse({
    status: 404,
    description: 'Pet not found.',
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
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiBody({ type: UpdatePetDto })
  @ApiResponse({
    status: 200,
    description: 'The pet has been successfully updated.',
    type: PetResponse,
  })
  @ApiResponse({
    status: 404,
    description: 'Pet not found.',
    type: PetResponse,
  })
  async update(@Param('id') id: string, @Body() dto: UpdatePetDto) {
    const pet = await this.petService.findOne({ where: { id } });

    if (!pet) {
      throw new BadRequestException(this.wrapFail('Pet not found'));
    }

    await this.petService.update(id, dto);
    return this.wrapSuccess({ pet });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a pet' })
  @ApiParam({
    name: 'id',
    description: 'Pet ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'The pet has been successfully deleted.',
    type: PetResponse,
  })
  @ApiResponse({
    status: 404,
    description: 'Pet not found.',
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
