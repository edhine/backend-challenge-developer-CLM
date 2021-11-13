import { Movie } from "./movie";

export interface MovieRepository {
    save(data: Movie | Movie[]): Promise<void>;
    findById(id: string): Promise<Movie | null>;
}