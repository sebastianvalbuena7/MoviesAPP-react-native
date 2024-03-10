import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { MovieDBMoviesResponse } from "../../../infrastructure/interfaces/movie-db.responses";
import { MovieMapper } from "../../../infrastructure/mappers/movie.mapper";
import { Movie } from "../../entities/movie.entity";

export const topRatedMoviesUseCase = async (fetcher: HttpAdapter): Promise<Movie[]> => {
    try {  
        const topRatedMovies = await fetcher.get<MovieDBMoviesResponse>('/top_rated');

        return topRatedMovies.results.map(MovieMapper.fromMovieDBResultToEntity);
    } catch (error) {
        throw new Error('Ha ocurrido un error - Upcoming');
    }
}