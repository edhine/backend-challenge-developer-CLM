import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { SharedModule } from './shared/shared.module';
import { MoviesModule } from './modules/movies/movies.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRoot(`mongodb://${process.env.MONGO_DB_HOST ? process.env.MONGO_DB_HOST : 'localhost'}:27017/challenge`),

    SharedModule,
    MoviesModule,
  ],
  providers: [
    { provide: APP_PIPE, useClass: ValidationPipe },
    AppService
  ],
})
export class AppModule {}
