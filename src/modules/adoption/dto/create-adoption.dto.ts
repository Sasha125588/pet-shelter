import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';

export class CreateAdoptionDto {
  @ApiProperty({
    description: 'ID of the pet to be adopted',
    example: '550e8400-e29b-41d4-a716-446655440001',
  })
  @IsUUID()
  @IsNotEmpty()
  animal_id: string;

  @ApiProperty({
    description: 'Full name of the applicant',
    example: 'John Michael Smith',
    minLength: 2,
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 100)
  applicant_name: string;

  @ApiProperty({
    description: 'Phone number of the applicant',
    example: '+1234567890',
    minLength: 10,
    maxLength: 20,
  })
  @IsString()
  @IsNotEmpty()
  @Length(10, 20)
  applicant_phone: string;

  @ApiProperty({
    description: 'Email address of the applicant',
    example: 'john.smith@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  applicant_email: string;

  @ApiProperty({
    description: 'Message explaining why the applicant wants to adopt this pet',
    example:
      'I want to give love and care to this wonderful animal. I have experience with dogs.',
    minLength: 10,
    maxLength: 1000,
  })
  @IsString()
  @IsNotEmpty()
  @Length(10, 1000)
  message: string;
}
