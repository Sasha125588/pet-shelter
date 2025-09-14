import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

import { AdoptionStatus } from './entities/adoption.entity';
import { SortOrder } from './dto/get-adoptions.dto';
import { BaseResolver } from 'src/shared/base/base.resolver';
import { AdoptionService } from './adoption.service';
import { AdoptionResponse, AdoptionsResponse } from './adoption.model';
import {
  UpdateAdoptionStatusDto,
  GetAdoptionsDto,
  CreateAdoptionDto,
} from './dto';
import { PetService } from '../pet/pet.service';
import { PetStatus } from '../pet/entities/pet.entity';

@ApiTags('📋 Adoption')
@Controller('adoptions')
export class AdoptionController extends BaseResolver {
  constructor(
    private readonly adoptionService: AdoptionService,
    private readonly petService: PetService,
  ) {
    super();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new adoption' })
  @ApiResponse({
    status: 201,
    description: 'The adoption has been successfully created.',
    type: AdoptionResponse,
  })
  async create(@Body() dto: CreateAdoptionDto) {
    const adoption = await this.adoptionService.save(dto);
    return this.wrapSuccess({ adoption });
  }

  @Get()
  @ApiOperation({ summary: 'Get all adoptions' })
  @ApiResponse({
    status: 200,
    description: 'Return all adoption.',
    type: AdoptionsResponse,
  })
  async findAll(@Query() dto: GetAdoptionsDto) {
    const query = this.adoptionService
      .createQueryBuilder('adoption')
      .leftJoinAndSelect('adoption.pet', 'pet');

    if (dto.name) {
      query.andWhere('pet.name ILIKE :name', {
        name: `%${dto.name}%`,
      });
    }
    if (dto.status) {
      query.andWhere('adoption.status = :status', { status: dto.status });
    }
    query.addOrderBy('adoption.created_at', dto.sort ?? SortOrder.DESC);

    const adoption = await query.getMany();
    return this.wrapSuccess({ adoption });
  }

  @Get('by-pet/:petId')
  @ApiOperation({ summary: 'Get all adoptions for a specific pet' })
  @ApiParam({
    name: 'petId',
    description: 'Pet ID',
    format: 'uuid',
    example: 'c7c30028-a47e-425b-a42a-3970f81999c7',
  })
  @ApiResponse({
    status: 200,
    description: 'Return all adoptions for the pet.',
    type: AdoptionsResponse,
  })
  async findByPetId(@Param('petId', ParseUUIDPipe) petId: string) {
    const adoption = await this.adoptionService.find({
      where: { pet_id: petId },
    });
    return this.wrapSuccess({ adoption });
  }

  // @Get('by-applicant/:applicantId')
  // @ApiOperation({
  //   summary: 'Get all adoption applications by a specific applicant',
  // })
  // @ApiParam({
  //   name: 'applicantId',
  //   description: 'Applicant ID',
  //   example: '550e8400-e29b-41d4-a716-446655440002',
  // })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Return all adoption applications by the applicant.',
  //   type: AdoptionApplicationsResponse,
  // })
  // async findByApplicant(@Param('applicantId') applicantId: string) {
  //   const adoptionApplications = await this.adoptionService.find({
  //     where: { applicant_id: applicantId },
  //   });
  //   return this.wrapSuccess({ adoptionApplications });
  // }

  @Get(':id')
  @ApiOperation({ summary: 'Get an adoption by id' })
  @ApiParam({
    name: 'id',
    description: 'Adoption ID',
    format: 'uuid',
    example: 'c7c30028-a47e-425b-a42a-3970f81999c7',
  })
  @ApiResponse({
    status: 200,
    description: 'Return the adoption.',
    type: AdoptionResponse,
  })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const adoption = await this.adoptionService.findOne({
      where: { id },
    });

    return this.wrapSuccess({ adoption });
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update adoption status' })
  @ApiParam({
    name: 'id',
    description: 'Adoption ID',
    format: 'uuid',
    example: 'c7c30028-a47e-425b-a42a-3970f81999c7',
  })
  @ApiResponse({
    status: 200,
    description: 'The adoption status has been successfully updated.',
    type: AdoptionResponse,
  })
  async updateStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateAdoptionStatusDto,
  ) {
    const adoption = await this.adoptionService.findOne({
      where: { id },
    });

    if (!adoption) {
      throw new BadRequestException(this.wrapFail('Adoption not found'));
    }

    if (
      (adoption.status === AdoptionStatus.APPROVED &&
        dto.status === AdoptionStatus.PENDING) ||
      dto.status === AdoptionStatus.REJECTED
    ) {
      throw new BadRequestException(
        this.wrapFail(
          'Cannot change status from approved to pending or refected',
        ),
      );
    }

    await this.adoptionService.update(id, dto);

    if (dto.status === AdoptionStatus.APPROVED) {
      await this.petService.update(adoption.pet_id, {
        status: PetStatus.ADOPTED,
      });
    }

    const updatedAdoption = await this.adoptionService.findOne({
      where: { id },
    });

    return this.wrapSuccess({ adoption: updatedAdoption });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an adoption' })
  @ApiParam({
    name: 'id',
    description: 'Adoption ID',
    format: 'uuid',
    example: 'c7c30028-a47e-425b-a42a-3970f81999c7',
  })
  @ApiResponse({
    status: 200,
    description: 'The adoption has been successfully deleted.',
    type: AdoptionResponse,
  })
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    const adoption = await this.adoptionService.findOne({
      where: { id },
    });

    if (!adoption) {
      throw new BadRequestException(this.wrapFail('Adoption not found'));
    }

    await this.adoptionService.delete(id);
    return this.wrapSuccess({ adoption });
  }
}
