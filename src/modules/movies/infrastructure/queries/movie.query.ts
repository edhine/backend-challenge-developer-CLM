import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Movie, MoviesQuery, Movies } from "../../application/queries/movie.query";
import { MovieEntity, MovieDocument } from "../entities/movie.entity";
import { firstValueFrom } from 'rxjs';
import { MyLogger } from "../../../../shared/application/logger/myLogger.service";

@Injectable()
export class MovieQueryImplement implements MoviesQuery {

    private readonly URL_EXTERNAL_API;
    private readonly APIKEY_EXTERNAL_API;

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
        @InjectModel(MovieEntity.name) private readonly movieModel: Model<MovieDocument>,
        private readonly myLogger: MyLogger,
    ) {
        this.myLogger.setContext(MovieQueryImplement.name);

        this.URL_EXTERNAL_API = this.configService.get<string>("EXTERNAL_API_MOVIES");
        this.APIKEY_EXTERNAL_API = this.configService.get<string>("EXTERNAL_API_MOVIES_KEY");
    }

    async findByTitle(title: string, year?: string): Promise<Movie> {
        this.myLogger.log(`findByTitle: Searching movie with title: ${title} and year (optional): ${year}`);
        const queryParams = new URLSearchParams();
        queryParams.append("apikey", this.APIKEY_EXTERNAL_API);
        queryParams.append("t", title);
        year && queryParams.append("y", year);
        this.myLogger.log(`findByTitle: Query params: ${queryParams.toString()}`);
        
        const responseExternalApi = await firstValueFrom(this.httpService.get(`${this.URL_EXTERNAL_API}?${queryParams.toString()}`));
        if (responseExternalApi.data && responseExternalApi.data.Response === "False") return undefined;

        const existMovie = await this.movieModel.findOne({
            Released: responseExternalApi.data.Released,
            Title: responseExternalApi.data.Title,
        }).exec();

        if (existMovie) {
            this.myLogger.warn(`findByTitle: Movie with title: ${title} and year (optional): ${year} already exists`);
            return this.convertMovieFromEntity(existMovie.toObject())
        };

        const movie = new this.movieModel(responseExternalApi.data);
        const savedMovie = await movie.save();
        this.myLogger.log(`findByTitle: Movie with title: ${title} and year (optional): ${year} saved`);
        return this.convertMovieFromEntity(savedMovie.toObject());
    }

    async find(page: number, limit: number): Promise<Movies> {
        this.myLogger.log(`find: Searching movies with page: ${page} and limit: ${limit}`);
        const movies = await this.movieModel.find().skip((page - 1) * limit).limit(limit).exec();
        this.myLogger.log(`find: Movies found: ${movies.length}`);
        return this.convertMoviesFromEntities(movies.map((movie) => movie.toObject()));
    }

    async searchAndReplacePlot(title: string, find: string, replace: string): Promise<Movie> {
        this.myLogger.log(`searchAndReplacePlot: Searching movie with title: ${title} and replace plot`);
        const movie = await this.movieModel.findOne({ Title: { $regex: title, $options: 'i' }}).select("Plot").exec();
        if (!movie) return undefined;
        
        this.myLogger.log(`searchAndReplacePlot: replace all movie.Plot with ${find}`);
        movie.Plot = movie.Plot.replace(new RegExp(find, 'gi'), replace);
        const movieUpdated = await movie.save();
        this.myLogger.log(`searchAndReplacePlot: Movie with title: ${title} and replace plot updated`);

        return this.convertMovieFromEntity(movieUpdated.toObject());
    }

    private convertMoviesFromEntities(entities: MovieEntity[]): Movies {
        return entities.map((entity) => ({
            ...entity,
            CreatedAt: entity.CreatedAt,
            UpdatedAt: entity.UpdatedAt,
        }));
    }

    private convertMovieFromEntity(movieEntity?: MovieEntity): undefined | Movie {
        return movieEntity
            ? {
                ...movieEntity,
                CreatedAt: movieEntity.CreatedAt,
                UpdatedAt: movieEntity.UpdatedAt,
            }
            : undefined;
    }
}