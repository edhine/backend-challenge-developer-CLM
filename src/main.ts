import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { MyLogger } from './shared/application/logger/myLogger.service';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule, { cors: true });
  const myLogger = new MyLogger();
  
  app.useLogger(myLogger);

  const configSwagger = new DocumentBuilder()
    .setTitle('backend-challenge-developer-CLM')
    .setVersion('1.0')
    .setContact('Sergio Andrés Orellana Roa', 'https://www.linkedin.com/in/sergio-andres-orellana-roa/', 'sergio.andres.orellana.roa@gmail.com')
    .build();
  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api', app, document);

  const config = app.get(ConfigService);
  const PORT = config.get('PORT');
  const HOST = config.get('HOST');
  await app.listen(PORT, HOST);

  myLogger.log(`is running on: ${await app.getUrl()} INIT Listening on port ${PORT}`, 'Application');
}
bootstrap();
