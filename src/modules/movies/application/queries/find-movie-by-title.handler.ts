import {
  Inject,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { MyLogger } from '../../../../shared/application/logger/myLogger.service';
import { ErrorMessage } from '../../domain/error';
import { MovieQueryImplement } from '../../infrastructure/queries/movie.query';
import { FindMovieByTitleQuery } from './find-movie-by-title.query';
import { FindMovieByTitleResult } from './find-movie-by-title.result';
import { ItemInMovie, MoviesQuery } from './movie.query';

@QueryHandler(FindMovieByTitleQuery)
export class FindMovieByTitleHandler
  implements IQueryHandler<FindMovieByTitleQuery, FindMovieByTitleResult>
{
  constructor(
    @Inject(MovieQueryImplement) readonly moviesQuery: MoviesQuery,
    private readonly myLogger: MyLogger
  ) {
    this.myLogger.setContext(FindMovieByTitleHandler.name);
  }

  async execute(query: FindMovieByTitleQuery): Promise<FindMovieByTitleResult> {
    this.myLogger.verbose(`Executing ${FindMovieByTitleQuery.name}...`);
    this.myLogger.debug(`${FindMovieByTitleQuery.name}: ${JSON.stringify(query)}`);

    const data = await this.moviesQuery.findByTitle(query.title, query.year);
    if (!data) {
      this.myLogger.error(ErrorMessage.MOVIE_IS_NOT_FOUND);
      throw new NotFoundException(ErrorMessage.MOVIE_IS_NOT_FOUND);
    }

    const response = this.filterResultProperties(data);
    this.myLogger.debug(`${FindMovieByTitleResult.name}: finish filter data response: ${JSON.stringify(data)}`);
    this.myLogger.verbose(`Executed ${FindMovieByTitleQuery.name} OK!`);
    return response;
  }

  private filterResultProperties(
    data: ItemInMovie,
  ): FindMovieByTitleResult {
    const dataKeys = Object.keys(data);
    const resultKeys = Object.keys(new FindMovieByTitleResult());

    if (dataKeys.length < resultKeys.length)
      throw new InternalServerErrorException();

    if (resultKeys.find((resultKey) => !dataKeys.includes(resultKey)))
      throw new InternalServerErrorException();

    dataKeys
      .filter((dataKey) => !resultKeys.includes(dataKey))
      .forEach((dataKey) => delete data[dataKey]);

    return data;
  }

}
