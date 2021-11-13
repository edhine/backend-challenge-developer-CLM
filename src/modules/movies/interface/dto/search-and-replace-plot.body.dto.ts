import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class SearchAndReplacePlotBodyDTO {

  @IsString()
  @MinLength(1)
  @MaxLength(50)
  @ApiProperty({ minLength: 1, maxLength: 50, example: 'star wars' })
  readonly title: string;

  @IsString()
  @MinLength(1)
  @MaxLength(50)
  @ApiProperty({ minLength: 1, maxLength: 50, example: 'jedi' })
  readonly find: string;

  @IsString()
  @MinLength(1)
  @MaxLength(50)
  @ApiProperty({ minLength: 1, maxLength: 50, example: 'CLM Dev' })
  readonly replace: string;
}
