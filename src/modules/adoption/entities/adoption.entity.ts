import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsUUID,
  IsEnum,
  Length,
  IsEmail,
} from 'class-validator';
import { Pet } from 'src/modules/pet/entities/pet.entity';
import { User } from 'src/modules/user/entities/user.entity';

export enum AdoptionStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

@Entity('adoptions')
@Index(['status'])
@Index(['pet_id'])
@Index(['applicant_id'])
export class Adoption {
  @ApiProperty({
    description: 'Unique identifier of the adoption',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Status of the adoption',
    enum: AdoptionStatus,
    example: AdoptionStatus.PENDING,
  })
  @Column({
    type: 'enum',
    enum: AdoptionStatus,
    default: AdoptionStatus.PENDING,
  })
  @IsEnum(AdoptionStatus)
  status: AdoptionStatus;

  @ApiProperty({
    description:
      'Message from the applicant explaining why they want to adopt this pet',
    example:
      'I want to give love and care to this wonderful animal. I have experience with dogs and a large yard.',
    minLength: 10,
    maxLength: 1000,
  })
  @Column({ type: 'text' })
  @IsString()
  @IsNotEmpty()
  @Length(10, 1000)
  message: string;

  @ApiProperty({
    description: 'ID of the pet to be adopted',
    example: '550e8400-e29b-41d4-a716-446655440001',
  })
  @Column({ type: 'uuid' })
  @IsUUID()
  @IsNotEmpty()
  pet_id: string;

  @ApiProperty({
    description: 'Pet information',
    type: () => Pet,
  })
  @ManyToOne(() => Pet, { eager: true })
  @JoinColumn({ name: 'pet_id' })
  pet: Pet;

  @ApiProperty({
    description: 'ID of the user who submitted the application',
    example: '550e8400-e29b-41d4-a716-446655440002',
  })
  @Column({ type: 'uuid' })
  @IsUUID()
  @IsNotEmpty()
  applicant_id: string;

  @ApiProperty({
    description: 'Applicant information',
    type: () => User,
  })
  @ManyToOne(() => User, (user) => user.adoptions, { eager: true })
  @JoinColumn({ name: 'applicant_id' })
  applicant: User;

  @ApiProperty({
    description: 'Date when the adoption was created',
    example: '2024-01-15T10:30:00.000Z',
  })
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty({
    description: 'Date when the adoption was last updated',
    example: '2024-01-16T14:20:00.000Z',
  })
  @UpdateDateColumn()
  updated_at: Date;
}
