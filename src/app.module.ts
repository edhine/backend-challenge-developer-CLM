import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { SharedModule } from './shared/shared.module';
import { MoviesModule } from './modules/movies/movies.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ...(process.env.STAGE === undefined && { envFilePath: ['.env.development.local'] }),
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: `mongodb://${configService.get('MONGO_DB_HOST')}:27017/challenge`,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),

    SharedModule,
    MoviesModule,
  ],
  providers: [
    { provide: APP_PIPE, useClass: ValidationPipe },
    AppService
  ],
})
export class AppModule {}
