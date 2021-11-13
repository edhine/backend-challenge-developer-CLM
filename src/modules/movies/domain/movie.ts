import { AggregateRoot } from "@nestjs/cqrs";

export type MovieRequiredProperties = Required<{
    Title: string;
}>;

export type MovieOptionalsProperties = Partial<{
    Year: string;
    Released: string;
    Genre: string;
    Director: string;
    Actors: string;
    Plot: string;
    Ratings: Object[];

    CreatedAt: Date;
    UpdatedAt: Date | null;
}>;

export type MovieProperties = MovieRequiredProperties & Required<MovieOptionalsProperties>;

export interface Movie {
    properties(): MovieProperties;
}

export class MovieImplement extends AggregateRoot implements Movie {

    private readonly Title: string;
    private Year: string;
    private Released: string;
    private Genre: string;
    private Director: string;
    private Actors: string;
    private Plot: string;
    private Ratings: Object[];

    private CreatedAt: Date = new Date();
    private UpdatedAt: Date | null = null;

    constructor(
        properties: MovieRequiredProperties & MovieOptionalsProperties
    ) {
        super();
        Object.assign(this, properties);
    }

    properties(): MovieProperties {
        return {
            Title: this.Title,

            Year: this.Year,
            Released: this.Released,
            Genre: this.Genre,
            Director: this.Director,
            Actors: this.Actors,
            Plot: this.Plot,
            Ratings: this.Ratings,

            CreatedAt: this.CreatedAt,
            UpdatedAt: this.UpdatedAt,
        };
    }
}