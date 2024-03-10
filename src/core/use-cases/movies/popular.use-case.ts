import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { MovieDBMoviesResponse } from "../../../infrastructure/interfaces/movie-db.responses";
import { MovieMapper } from "../../../infrastructure/mappers/movie.mapper";
import { Movie } from "../../entities/movie.entity";

export const popularMoviesUseCase = async (fetcher: HttpAdapter): Promise<Movie[]> => {
    try {  
        const popularMovies = await fetcher.get<MovieDBMoviesResponse>('/popular');

        return popularMovies.results.map(MovieMapper.fromMovieDBResultToEntity);
    } catch (error) {
        throw new Error('Ha ocurrido un error - Upcoming');
    }
}