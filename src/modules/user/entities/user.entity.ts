import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Adoption } from 'src/modules/adoption/entities/adoption.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'Unique identifier of the user',
    example: 'c7c30028-a47e-425b-a42a-3970f81999c7',
  })
  id: string;

  @ApiProperty({
    description: 'User name',
    example: 'test',
  })
  @Column({
    type: 'varchar',
    name: 'username',
    nullable: false,
  })
  username: string;

  @ApiProperty({
    description: 'User email',
    example: 'test@gmail.com',
  })
  @Column({
    type: 'varchar',
    name: 'email',
    nullable: true,
  })
  email: string;

  @ApiProperty({
    description: 'User password',
    example: 'test123',
  })
  @Exclude()
  @Column({
    type: 'varchar',
    name: 'password',
    nullable: false,
  })
  password: string;

  @ApiProperty({
    description: 'User adoption applications',
    type: () => [Adoption],
  })
  @OneToMany(() => Adoption, (adoption) => adoption.applicant)
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
