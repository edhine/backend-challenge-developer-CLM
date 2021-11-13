import { IQuery } from '@nestjs/cqrs';

export class FindMovieByTitleQuery implements IQuery {
  constructor(readonly title: string, readonly year?: string) {}
}