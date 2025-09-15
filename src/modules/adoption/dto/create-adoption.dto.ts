import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';

export class CreateAdoptionDto {
  @ApiProperty({
    description: 'ID of the pet to be adopted',
    example: 'c7c30028-a47e-425b-a42a-3970f81999c7',
  })
  @IsUUID()
  @IsNotEmpty()
  petId: string;

  @ApiProperty({
    description: 'ID of the user',
    example: 'c7c30028-a47e-425b-a42a-3970f81999c7',
  })
  @IsUUID()
  @IsNotEmpty()
  applicantId: string;

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
