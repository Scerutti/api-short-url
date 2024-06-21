import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle("TEMPLATE BACKEND - HREF")
    .setVersion("3.0.0")
    .build();

  const document = SwaggerModule.createDocument(app,config);
  SwaggerModule.setup('api-docs', app, document)
  await app.listen(process.env.PORT!,'0.0.0.0');
}
bootstrap();