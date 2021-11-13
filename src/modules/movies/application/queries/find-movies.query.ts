import { IQuery } from '@nestjs/cqrs';

export class FindMoviesQuery implements IQuery {
  constructor(readonly page: number, readonly limit: number) {}
}
