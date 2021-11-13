import { IQueryResult } from '@nestjs/cqrs';

export class SearchAndReplacePlotResult implements IQueryResult {
    readonly Plot: string = '';
}
