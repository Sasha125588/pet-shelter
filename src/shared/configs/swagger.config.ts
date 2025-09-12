import { DocumentBuilder } from '@nestjs/swagger';

export function getSwaggerConfig() {
  return new DocumentBuilder()
    .setTitle('Pet Shelter')
    .setDescription(
      'REST API for pet shelter management system. Help animals find their forever homes through adoption applications and shelter operations',
    )
    .setVersion('1.0')
    .build();
}
