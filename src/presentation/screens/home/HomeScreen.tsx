import { Text, View, ScrollView } from "react-native"
import { useMovies } from "../../hooks/useMovies"
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PosterCarousel } from "../../components/movies/PosterCarousel";
import { HorizontalCarousel } from "../../components/movies/HorizontalCarousel";
import { FullScreenLoader } from "../../components/loaders/FullScreenLoader";

export const HomeScreen = () => {
    const { top } = useSafeAreaInsets();

    const { isLoading, nowPlaying, popular, topRated, upcoming, popularNextPage } = useMovies();

    if (isLoading) {
        return <FullScreenLoader />
    }

    return (
        <ScrollView>
            <View style={{ marginTop: top + 20, paddingBottom: 30 }}>
                {/* Principal */}
                <PosterCarousel movies={nowPlaying} />

                {/* Populares */}
                <HorizontalCarousel
                    movies={popular}
                    title="Popular"
                    loadNextPage={popularNextPage}
                />

                {/* Mejor calificadas */}
                <HorizontalCarousel movies={topRated} title="Top Rated" />

                {/* Proximamente */}
                <HorizontalCarousel movies={upcoming} title="Upcoming" />
            </View>
        </ScrollView>
    )
}
