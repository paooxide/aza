import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false, // Will remove extra properties, but not throw an error
    }),
  );
  app.setGlobalPrefix('api/v1');
  const config = new DocumentBuilder()
    .setTitle('Aza Payment Server')
    .setDescription('Aza Payment Server for recurrent payments')
    .setVersion('1.0')
    .addTag('users')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/docs', app, document);
  app.use(helmet());
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
