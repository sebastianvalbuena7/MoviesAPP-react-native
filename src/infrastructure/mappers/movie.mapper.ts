import { Movie } from "../../core/entities/movie.entity";
import type { Result } from "../interfaces/movie-db.responses";

export class MovieMapper {
    static fromMovieDBResultToEntity(result: Result): Movie {
        return {
            id: result.id,
            title: result.title,
            description: result.overview,
            releaseDate: new Date(result.release_date),
            backdrop: `https://image.tmdb.org/t/p/w500/${result.backdrop_path}`,
            poster: `https://image.tmdb.org/t/p/w500/${result.poster_path}`,
            rating: result.vote_average
        }
    }
}