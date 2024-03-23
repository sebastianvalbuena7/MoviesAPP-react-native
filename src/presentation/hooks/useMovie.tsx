import { useEffect, useState } from "react"
import { movieDBFetcher } from "../../config/adapters/movieDB.adapter";
import { getMovieByIdUseCase } from "../../core/use-cases";
import { FullMovie } from "../../core/entities/movie.entity";

export const useMovie = (movieId: number) => {
    const [isLoading, setIsLoading] = useState(true);
    const [movie, setmovie] = useState<FullMovie>()

    useEffect(() => {
        loadMovie();
    }, [movieId]);

    const loadMovie = async () => {
        setIsLoading(true);
        
        const fullMovie = await getMovieByIdUseCase(movieDBFetcher, movieId);
        setmovie(fullMovie);

        setIsLoading(false);
    }

    return {
        isLoading,
        movie
    }
}