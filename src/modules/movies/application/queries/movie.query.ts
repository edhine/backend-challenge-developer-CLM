export class Movie {
  readonly Title: string;
  readonly Year: string;
  readonly Released: string;
  readonly Genre: string;
  readonly Director: string;
  readonly Actors: string;
  readonly Plot: string;
  readonly Ratings: Object[];

  readonly CreatedAt: Date;
  readonly UpdatedAt: Date | null;
}

export class ItemInMovie {
  readonly Title: string;
  readonly Year: string;
  readonly Released: string;
  readonly Genre: string;
  readonly Director: string;
  readonly Actors: string;
  readonly Plot: string;
  readonly Ratings: Object[];

  readonly CreatedAt: Date;
  readonly UpdatedAt: Date | null;
}

export class Movies extends Array<ItemInMovie> {}

export interface MoviesQuery {
  findByTitle(title: string, year?: string): Promise<Movie>;
  find(offset: number, limit: number): Promise<Movies>;
  searchAndReplacePlot(title: string, find: string, replace: string) : Promise<Movie>;
}
