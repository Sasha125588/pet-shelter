import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';

export class CreateAdoptionDto {
  @ApiProperty({
    description: 'ID of the pet to be adopted',
    example: '550e8400-e29b-41d4-a716-446655440001',
  })
  @IsUUID()
  @IsNotEmpty()
  pet_id: string;

  @ApiProperty({
    description: 'ID of the user',
    example: '550e8400-e29b-41d4-a716-446655440001',
  })
  @IsUUID()
  @IsNotEmpty()
  applicant_id: string;

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
