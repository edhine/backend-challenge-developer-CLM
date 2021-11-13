import {
  Inject,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { MyLogger } from '../../../../shared/application/logger/myLogger.service';
import { ErrorMessage } from '../../domain/error';
import { MovieQueryImplement } from '../../infrastructure/queries/movie.query';
import { ItemInMovie, MoviesQuery } from './movie.query';
import { SearchAndReplacePlotQuery } from './search-and-replace-plot.query';
import { SearchAndReplacePlotResult } from './search-and-replace-plot.result';

@QueryHandler(SearchAndReplacePlotQuery)
export class SearchAndReplacePlotHandler
  implements IQueryHandler<SearchAndReplacePlotQuery, SearchAndReplacePlotResult>
{
  constructor(
    @Inject(MovieQueryImplement) readonly moviesQuery: MoviesQuery,
    private readonly myLogger: MyLogger
  ) {
    this.myLogger.setContext(SearchAndReplacePlotHandler.name);
  }

  async execute(query: SearchAndReplacePlotQuery): Promise<SearchAndReplacePlotResult> {
    this.myLogger.verbose(`Executing ${SearchAndReplacePlotQuery.name}...`);
    this.myLogger.debug(`${SearchAndReplacePlotQuery.name}: ${JSON.stringify(query)}`);

    const data = await this.moviesQuery.searchAndReplacePlot(query.title, query.find, query.replace);
    if (!data) {
      this.myLogger.error(ErrorMessage.MOVIE_IS_NOT_FOUND);
      throw new NotFoundException(ErrorMessage.MOVIE_IS_NOT_FOUND);
    }
    
    const response = this.filterResultProperties(data);
    this.myLogger.debug(`${SearchAndReplacePlotResult.name}: finish filter data response: ${JSON.stringify(data)}`);
    this.myLogger.verbose(`Executed ${SearchAndReplacePlotQuery.name} OK!`);
    return response;
  }

  private filterResultProperties(
    data: ItemInMovie,
  ): SearchAndReplacePlotResult {
    const dataKeys = Object.keys(data);
    const resultKeys = Object.keys(new SearchAndReplacePlotResult());

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
