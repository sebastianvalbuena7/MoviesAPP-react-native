import { useEffect, useState } from "react"
import { Movie } from "../../core/entities/movie.entity"
import { moviesNowPlayingUseCase } from "../../core/use-cases";
import { movieDBFetcher } from "../../config/adapters/movieDB.adapter";
import { upcomingMoviesUseCase } from "../../core/use-cases/movies/upcoming.use-case";
import { topRatedMoviesUseCase } from "../../core/use-cases/movies/top-rated.use-case";
import { popularMoviesUseCase } from "../../core/use-cases/movies/popular.use-case";

let popularPageNumber = 1;

export const useMovies = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
    const [popular, setPopular] = useState<Movie[]>([]);
    const [topRated, setTopRated] = useState<Movie[]>([]);
    const [upcoming, setUpcoming] = useState<Movie[]>([]);

    useEffect(() => {
        initialLoad();
    }, []);

    const initialLoad = async () => {
        const nowPlayingPromise = moviesNowPlayingUseCase(movieDBFetcher);
        const popularPromise = popularMoviesUseCase(movieDBFetcher);
        const topRatedPromise = topRatedMoviesUseCase(movieDBFetcher);
        const upcomingPromise = upcomingMoviesUseCase(movieDBFetcher);

        const [
            nowPlayingMovies,
            popularMovies,
            topRatedMovies,
            upcomingMovies
        ] = await Promise.all([
            nowPlayingPromise,
            popularPromise,
            topRatedPromise,
            upcomingPromise
        ]);

        setNowPlaying(nowPlayingMovies);
        setPopular(popularMovies);
        setTopRated(topRatedMovies);
        setUpcoming(upcomingMovies);

        setIsLoading(false);
    }

    return {
        isLoading,
        nowPlaying,
        popular,
        topRated,
        upcoming,

        // Metodos
        popularNextPage: async () => {
            popularPageNumber++;
            const popularMovies = await popularMoviesUseCase(movieDBFetcher, {
                page: popularPageNumber
            });

            setPopular(prev => [...prev, ...popularMovies]);
        }
    }
}
