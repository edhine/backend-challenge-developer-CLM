import { IQuery } from '@nestjs/cqrs';

export class SearchAndReplacePlotQuery implements IQuery {
  constructor(
    readonly title: string, 
    readonly find: string,
    readonly replace: string,
  ) {}
}