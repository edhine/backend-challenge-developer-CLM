import { ApiProperty } from '@nestjs/swagger';
import { SearchAndReplacePlotResult } from '../../application/queries/search-and-replace-plot.result';

export class SearchAndReplacePlotResponseDTO extends SearchAndReplacePlotResult {
    @ApiProperty({ example: 'Description the Plot' })
    readonly Plot: string;
}