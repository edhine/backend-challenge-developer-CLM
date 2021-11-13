import { Inject, InternalServerErrorException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { MyLogger } from '../../../../shared/application/logger/myLogger.service';
import { MovieQueryImplement } from '../../infrastructure/queries/movie.query';
import { FindMoviesQuery } from './find-movies.query';
import { FindMoviesResult, ItemInFindMoviesResult } from './find-movies.result';
import { ItemInMovie, MoviesQuery } from './movie.query';

@QueryHandler(FindMoviesQuery)
export class FindMoviesHandler
  implements IQueryHandler<FindMoviesQuery, FindMoviesResult>
{
  constructor(
    @Inject(MovieQueryImplement) readonly accountQuery: MoviesQuery,
    private readonly myLogger: MyLogger,
  ) {
    this.myLogger.setContext(FindMoviesHandler.name);
  }

  async execute(query: FindMoviesQuery): Promise<FindMoviesResult> {
    this.myLogger.verbose(`Executing ${FindMoviesQuery.name}...`);
    this.myLogger.debug(`${FindMoviesQuery.name}: ${JSON.stringify(query)}`);
    const movies = await this.accountQuery.find(query.page, query.limit);

    const response = movies.map(this.filterResultProperties);
    this.myLogger.debug(`${ItemInFindMoviesResult.name}: finish filter data response: ${JSON.stringify(movies)}`);
    this.myLogger.verbose(`Executed ${FindMoviesQuery.name} OK!`);
    return response;
  }

  private filterResultProperties(
    data: ItemInMovie,
  ): ItemInFindMoviesResult {
    const dataKeys = Object.keys(data);
    const resultKeys = Object.keys(new ItemInFindMoviesResult());

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
