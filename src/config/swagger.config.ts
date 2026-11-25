import type { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication, path = '/'): void {
  const config = new DocumentBuilder()
    .setTitle(process.env.SWAGGER_TITLE ?? 'Report and Analysis')
    .setDescription(process.env.SWAGGER_DESCRIPTION ?? 'API for reports and analytics')
    .setVersion(process.env.SWAGGER_VERSION ?? '0.0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(path, app, document);
}
