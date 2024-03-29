import { THE_MOVIE_DB_KEY } from "@env";
import { AxiosAdapter } from "./http/axios.adapter";

export const movieDBFetcher = new AxiosAdapter({
    baseUrl: 'https://api.themoviedb.org/3/movie',
    params: {
        // api_key: '16dcf21f09991dee554487a44feaa83d'
        api_key: THE_MOVIE_DB_KEY ?? 'No key'
    }
});