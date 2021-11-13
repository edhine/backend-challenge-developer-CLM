import { ApiProperty, OmitType } from '@nestjs/swagger';
import { FindMoviesResult, ItemInFindMoviesResult } from '../../application/queries/find-movies.result';

class FindMoviesItem extends ItemInFindMoviesResult {
  @ApiProperty({ example: 'example: Star Wars', description: 'Title of the movie' })
  readonly Title: string;

  @ApiProperty({ example: 'example: 1977', description: 'Year of the movie' })
  readonly Year: string;

  @ApiProperty({ example: 'example: 25 May 1977', description: 'Date of the movie' })
  readonly Released: string;
  
  @ApiProperty({ example: 'example: Action, Adventure, Fantasy', description: 'Genres of the movie' })
  readonly Genre: string;
  
  @ApiProperty({ example: 'example: George Lucas', description: 'Director of the movie' })
  readonly Director: string;
  
  @ApiProperty({ example: 'example: Mark Hamill, Harrison Ford, Carrie Fisher', description: 'Actors of the movie' })
  readonly Actors: string;
  
  @ApiProperty({ 
      example: "example: Luke Skywalker joins forces with a Jedi Knight, Jedi a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire's world-destroying battle station, while also attempting to rescue Princess Leia from the mysterious Darth Vad",
      description: 'Plot of the movie' 
  })
  readonly Plot: string;
  
  @ApiProperty({ 
      example: [
          { Source : "example: Internet Movie Database", Value : "example: 8.6/10" }, 
      ],
      description: 'example: Ratings of the movie'
  })
  readonly Ratings: Object[];
  
  @ApiProperty({ example: new Date(), description: 'Date created document' })
  readonly CreatedAt: Date;

  @ApiProperty({ example: new Date(), description: 'Date updated document' })
  readonly UpdatedAt: Date;
}

export class FindMoviesResponseDTO {
  @ApiProperty({ type: [FindMoviesItem] })
  readonly movies: FindMoviesResult;
}
