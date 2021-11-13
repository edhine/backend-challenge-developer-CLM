import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class FindMovieByTitleParamDTO {
  @IsString()
  @ApiProperty({
    description: 'Title the movie',
    example: 'star wars',
  })
  readonly title: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Filter by year of movies',
    required: false
  })
  readonly year: string;
}
