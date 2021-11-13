import { ApiProperty } from '@nestjs/swagger';
import { Type,  } from 'class-transformer';
import { IsNumber, IsOptional, Max, Min } from 'class-validator';

export class FindMoviesQueryDTO {
  @IsOptional()
  @Min(1)
  @ApiProperty({ required: false, default: 1, minimum: 1 })
  @Type(() => Number)
  @IsNumber()
  readonly page: number = 1;

  @IsOptional()
  @Min(1)
  @Max(5)
  @ApiProperty({ required: false, default: 5, minimum: 1, maximum: 5 })
  @Type(() => Number)
  @IsNumber()
  readonly limit: number = 5;
}
