import { Inject } from "@nestjs/common";
import { EventPublisher } from "@nestjs/cqrs";
import { Movie, MovieImplement, MovieProperties } from "./movie";

/**
 * this class is not in use because the microservice does not have commands that return "void"
 */
export class MovieFactory {
    
    constructor(
        @Inject(EventPublisher) private readonly eventPublisher: EventPublisher
    ) {}

    create(title: string, year: string): Movie {
        return this.eventPublisher.mergeObjectContext(
            new MovieImplement({ 
                Title: title,
                Year: year
             }),
        );
    }

    reconstitute(properties: MovieProperties): Movie {
        return this.eventPublisher.mergeObjectContext(
            new MovieImplement(properties),
        );
    }
}