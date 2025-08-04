
import { useFeaturedMovies } from "@/hooks/useFeaturedMovies";
import MovieCard from "@/components/MovieCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const PopularMovies = () => {
  const { featuredMovies, loading, error } = useFeaturedMovies('popular', 12);

  // Helper function to convert genre IDs to names
  const getGenreName = (id: number): string => {
    const genreMap: { [key: number]: string } = {
      28: "Action", 12: "Adventure", 16: "Animation", 35: "Comedy", 80: "Crime",
      99: "Documentary", 18: "Drama", 10751: "Family", 14: "Fantasy", 36: "History",
      27: "Horror", 10402: "Music", 9648: "Mystery", 10749: "Romance", 878: "Science Fiction",
      10770: "TV Movie", 53: "Thriller", 10752: "War", 37: "Western"
    };
    return genreMap[id] || "Unknown";
  };

  if (loading) {
    return (
      <section className="px-4 md:px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="backdrop-blur-xl bg-card/80 border border-border rounded-2xl p-4 md:p-8 shadow-lg">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Popular Movies</h2>
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading popular movies...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || featuredMovies.length === 0) {
    return (
      <section className="px-4 md:px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="backdrop-blur-xl bg-card/80 border border-border rounded-2xl p-4 md:p-8 shadow-lg">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Popular Movies</h2>
            <div className="text-center py-8">
              <p className="text-muted-foreground">No popular movies available</p>
              <p className="text-muted-foreground/60 mt-2 text-sm">Check back later for featured content</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Transform featured movies to match MovieCard interface
  const transformedMovies = featuredMovies.map(featuredMovie => {
    const movie = featuredMovie.movies;
    const genres = Array.isArray(movie.genre_ids) 
      ? movie.genre_ids.slice(0, 3).map(id => getGenreName(id))
      : [];
    
    const year = movie.release_date ? new Date(movie.release_date).getFullYear() : new Date().getFullYear();
    const posterUrl = movie.poster_path 
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=500&h=750&fit=crop';

    return {
      id: movie.id,
      title: movie.title,
      year,
      rating: movie.rating || 0,
      genre: genres,
      duration: "2h 30m", // Default duration since it's not in the database
      poster: posterUrl
    };
  });

  return (
    <section className="px-4 md:px-6 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="backdrop-blur-xl bg-card/80 border border-border rounded-2xl p-4 md:p-8 shadow-lg">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Popular Movies</h2>
          
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex space-x-4 pb-4">
              {transformedMovies.map((movie) => (
                <div key={movie.id} className="w-44 sm:w-48 md:w-52 flex-shrink-0">
                  <MovieCard movie={movie} />
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </div>
    </section>
  );
};

export default PopularMovies;
