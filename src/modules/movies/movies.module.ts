import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerModule } from '../../shared/application/logger/logger.module';
import { FindMovieByTitleHandler } from './application/queries/find-movie-by-title.handler';
import { FindMoviesHandler } from './application/queries/find-movies.handler';
import { SearchAndReplacePlotHandler } from './application/queries/search-and-replace-plot.handler';
import { MovieFactory } from './domain/factory';
import { MovieEntity, MovieSchema } from './infrastructure/entities/movie.entity';
import { IntegrationEventPublisherImplement } from './infrastructure/message/integration-event.publisher';
import { MovieQueryImplement } from './infrastructure/queries/movie.query';
import { MoviesController } from './interface/movies.controller';

const infrastructure = [
  IntegrationEventPublisherImplement,
  MovieQueryImplement,
];

const application = [
  FindMoviesHandler,
  FindMovieByTitleHandler,
  SearchAndReplacePlotHandler,
];

const domain = [
  MovieFactory
];

const externalThisModule = [];

@Module({
  imports: [
    LoggerModule,
    CqrsModule,
    HttpModule,
    MongooseModule.forFeature([{ name: MovieEntity.name, schema: MovieSchema }]),
  ],
  exports: [
    ...infrastructure
  ],
  controllers: [MoviesController],
  providers: [...infrastructure, ...application, ...domain, ...externalThisModule]
})
export class MoviesModule {}
