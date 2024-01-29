import { InternalServerErrorException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { PrismaClientExceptionFilter } from './common/exceptions/prisma-exception.filter';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    const config = app.get<ConfigService>(ConfigService)
    app.useGlobalFilters(
      new PrismaClientExceptionFilter(),
      new HttpExceptionFilter(),
    );
    app.useGlobalPipes(new ValidationPipe())
    app.enableCors();
    app.setGlobalPrefix('/api/v1');
    await app.listen(config.get('PORT') || 3000);
  } catch (error) {
    throw new InternalServerErrorException(error?.message || "Silence is Golden...");
  }
}
bootstrap();
