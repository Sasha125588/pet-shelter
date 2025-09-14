import type { INestApplication } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { getSwaggerConfig } from '../configs/swagger.config';
import { apiReference } from '@scalar/nestjs-api-reference';

export const setupSwagger = (app: INestApplication) => {
  const config = getSwaggerConfig();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/docs', app, document);

  app.use(
    '/docs2',
    apiReference({
      content: document,
    }),
  );
};
