import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { MovieDBMoviesResponse } from "../../../infrastructure/interfaces/movie-db.responses";
import { MovieMapper } from "../../../infrastructure/mappers/movie.mapper";
import { Movie } from "../../entities/movie.entity";

interface Options {
    page?: number;
    limit?: number;
}

export const popularMoviesUseCase = async (fetcher: HttpAdapter, options?: Options): Promise<Movie[]> => {
    try {
        const popularMovies = await fetcher.get<MovieDBMoviesResponse>('/popular', {
            params: {
                page: options?.page ?? 1
            }
        });

        return popularMovies.results.map(MovieMapper.fromMovieDBResultToEntity);
    } catch (error) {
        throw new Error('Ha ocurrido un error - Upcoming');
    }
}