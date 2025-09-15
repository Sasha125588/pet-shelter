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
    description: 'Уникальный идентификатор пользователя',
    example: '1a2b3c4d-5678-90ef-gh12-3456789ijklm',
  })
  id: string;

  @Column({
    type: 'varchar',
    name: 'username',
    nullable: false,
  })
  username: string;

  @Column({
    type: 'varchar',
    name: 'email',
    nullable: true,
  })
  email: string;

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
