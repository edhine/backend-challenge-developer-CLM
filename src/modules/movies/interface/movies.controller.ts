import { Body, Controller, Get, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { FindMovieByTitleQuery } from '../application/queries/find-movie-by-title.query';
import { FindMoviesQuery } from '../application/queries/find-movies.query';
import { FindMoviesQueryDTO } from './dto/find-movies.query.dto';
import { FindMoviesResponseDTO } from './dto/find-movies.response.dto';
import { FindMovieByTitleParamDTO } from './dto/find-movie-by-title.query.dto';
import { FindMoviesByTitleResponseDTO } from './dto/find-movie-by-title.response.dto';
import { ResponseDescription } from './response-description';
import { SearchAndReplacePlotBodyDTO } from './dto/search-and-replace-plot.body.dto';
import { SearchAndReplacePlotResponseDTO } from './dto/search-and-replace-plot.response.dto';
import { SearchAndReplacePlotQuery } from '../application/queries/search-and-replace-plot.query';
import { MyLogger } from '../../../shared/application/logger/myLogger.service';

@ApiTags('Movie')
@Controller()
export class MoviesController {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly myLogger: MyLogger
    ) {
        this.myLogger.setContext(MoviesController.name);
    }

    @Get('movie')
    @ApiResponse({ status: 200, description: ResponseDescription.OK, type: FindMoviesByTitleResponseDTO})
    async findMoviesByTitle(
        @Query() paramDto: FindMovieByTitleParamDTO
    ): Promise<FindMoviesByTitleResponseDTO> {
        this.myLogger.log(`findMoviesByTitle: [PARAM] ${JSON.stringify(paramDto)} received OK!`);
        const query = new FindMovieByTitleQuery(paramDto.title, paramDto.year);
        return this.queryBus.execute(query);
    }

    @Get('movies')
    @ApiResponse({ status: 200, description: ResponseDescription.OK, type: FindMoviesResponseDTO })
    @UsePipes(new ValidationPipe({ transform: true }))
    async findMovies(
        @Query() queryDto: FindMoviesQueryDTO
    ): Promise<FindMoviesResponseDTO> {
        this.myLogger.log(`findMovies: [QUERY] ${JSON.stringify(queryDto)} received OK!`);
        const query = new FindMoviesQuery(queryDto.page, queryDto.limit);
        return { movies: await this.queryBus.execute(query) };
    }

    @Post('movie')
    @ApiResponse({ status: 200, description: ResponseDescription.OK, type: SearchAndReplacePlotResponseDTO })
    @UsePipes(new ValidationPipe({ transform: true }))
    async searchAndReplacePlot(
        @Body() bodyDto: SearchAndReplacePlotBodyDTO
    ): Promise<SearchAndReplacePlotResponseDTO> {
        this.myLogger.log(`searchAndReplacePlot: [BODY] ${JSON.stringify(bodyDto)} received OK!`);
        const query = new SearchAndReplacePlotQuery(bodyDto.title, bodyDto.find, bodyDto.replace);
        return this.queryBus.execute(query);
    }

}
