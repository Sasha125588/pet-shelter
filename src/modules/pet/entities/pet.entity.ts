import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Adoption } from 'src/modules/adoption/entities/adoption.entity';

export enum Sex {
  MALE = 'male',
  FEMALE = 'female',
}

export enum PetStatus {
  AVAILABLE = 'available',
  PENDING = 'pending',
  ADOPTED = 'adopted',
}

@Entity({ name: 'pets' })
export class Pet {
  @ApiProperty({
    type: 'string',
    description: 'Unique pet identifier',
    example: 'c7c30028-a47e-425b-a42a-3970f81999c7',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    type: 'string',
    description: 'Pet name',
    example: 'Bobik',
  })
  @Column({ type: 'varchar', nullable: true })
  name: string;

  @ApiProperty({
    type: 'string',
    description: 'Pet description',
    example: 'Affectionate kitty',
  })
  @Column({ type: 'text', nullable: true })
  description: string;

  @ApiProperty({
    type: 'string',
    description: 'Pet sex',
    enum: Sex,
    example: Sex.FEMALE,
  })
  @Column({ type: 'enum', enum: Sex })
  sex: Sex;

  @ApiProperty({
    type: 'number',
    description: 'Pet age',
    example: '1.6',
  })
  @Column({ type: 'decimal' })
  age: number;

  @ApiProperty({
    type: 'string',
    description: 'Pet breed',
    example: 'British Shorthair',
  })
  @Column({ type: 'varchar', nullable: true })
  breed: string;

  @ApiProperty({
    type: [String],
    description: 'Array of photo URLs for the pet',
    example: ['https://example.com/dog.jpg', 'https://example.com/dog2.jpg'],
  })
  @Column('simple-array', { nullable: true, name: 'photo_urls' })
  photoUrls: string[];

  @ApiProperty({
    type: 'string',
    description: 'Pet status',
    enum: PetStatus,
    example: PetStatus.AVAILABLE,
  })
  @Column({ type: 'enum', enum: PetStatus, default: PetStatus.AVAILABLE })
  status: PetStatus;

  @ApiProperty({
    type: () => [Adoption],
    description: 'Adoption applications for this pet',
    required: false,
  })
  @OneToMany(() => Adoption, (adoption) => adoption.pet)
  adoptions: Adoption[];

  @ApiProperty({
    type: 'string',
    description: 'Date when the pet record was created',
    example: '2024-01-15T10:30:00.000Z',
  })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty({
    type: 'string',
    description: 'Date when the pet record was last updated',
    example: '2024-01-16T14:20:00.000Z',
  })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
