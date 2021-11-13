import { IQueryResult } from '@nestjs/cqrs';

export class FindMovieByTitleResult implements IQueryResult {
    readonly Title: string = '';
    readonly Year: string = '';
    readonly Released: string = '';
    readonly Genre: string = '';
    readonly Director: string = '';
    readonly Actors: string = '';
    readonly Plot: string = '';
    readonly Ratings: Object[] = [];

    readonly CreatedAt: Date = new Date();
    readonly UpdatedAt: Date | null = null;
}
