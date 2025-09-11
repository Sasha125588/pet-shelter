import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { AdoptionApplication } from 'src/modules/adoption/entities/adoption.entity';

export enum Sex {
  MALE = 'male',
  FEMALE = 'female',
}

export enum Status {
  AVAILABLE = 'available',
  PENDING = 'pending',
  ADOPTED = 'adopted',
}

@Entity({ name: 'pets' })
export class Pet {
  @ApiProperty({
    type: 'string',
    description: 'Unique pet identifier',
    example: 'e6e62459-02c0-456a-a0b3-5d26a5b75e87',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    type: 'string',
    description: 'Unique pet identifier',
    example: 'e6e62459-02c0-456a-a0b3-5d26a5b75e87',
  })
  @Column({ type: 'text' })
  name: string;

  @ApiProperty({
    type: 'string',
    description: 'Pet description',
    example: 'Affectionate kitty',
  })
  @Column({ type: 'text' })
  description: string;

  @ApiProperty({
    type: 'string',
    description: 'Pet sex',
    example: 'Female',
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
  @Column({ type: 'text' })
  breed: string;

  @ApiProperty({
    type: [String],
    description: 'Array of photo URLs for the pet',
    example: ['https://example.com/dog.jpg', 'https://example.com/dog2.jpg'],
  })
  @Column('simple-array', { nullable: true })
  photoUrls: string[];

  @ApiProperty({
    type: 'string',
    description: 'Pet status',
    enum: Status,
    example: Status.AVAILABLE,
  })
  @Column({ type: 'enum', enum: Status, default: Status.AVAILABLE })
  status: Status;

  @ApiProperty({
    type: () => [AdoptionApplication],
    description: 'Adoption applications for this pet',
    required: false,
  })
  @OneToMany(() => AdoptionApplication, (application) => application.pet)
  adoptionApplications: AdoptionApplication[];

  @ApiProperty({
    type: 'string',
    description: 'Date when the pet record was created',
    example: '2024-01-15T10:30:00.000Z',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    type: 'string',
    description: 'Date when the pet record was last updated',
    example: '2024-01-16T14:20:00.000Z',
  })
  @UpdateDateColumn()
  updatedAt: Date;
}
