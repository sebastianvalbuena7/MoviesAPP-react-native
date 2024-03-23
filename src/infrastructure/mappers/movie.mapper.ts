import { FullMovie, Movie } from "../../core/entities/movie.entity";
import type { MovieDbMovie, Result } from "../interfaces/movie-db.responses";

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

    static fromMovieDBToEntity(movie: MovieDbMovie): FullMovie {
        return {
            backdrop: `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`,
            budget: movie.budget,
            description: movie.overview,
            duration: movie.runtime,
            genres: movie.genres.map(genre => genre.name),
            title: movie.title,
            originalTitle: movie.original_title,
            poster: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
            rating: movie.vote_average,
            id: movie.id,
            releaseDate: new Date(movie.release_date),
            productionCompanis: movie.production_companies.map(prod => prod.name)
        }
    }
}