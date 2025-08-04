
import { useState } from "react";
import { Search, Loader2, Star, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { tmdbService, TMDBSearchResult, TMDBMovie, TMDBCastMember } from "@/services/tmdbService";

interface TMDBSearchProps {
  onMovieSelect: (movie: TMDBMovie, cast: TMDBCastMember[], seoData: any) => void;
}

const TMDBSearch = ({ onMovieSelect }: TMDBSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<TMDBSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    try {
      const results = await tmdbService.searchMovies(searchQuery);
      setSearchResults(results);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleMovieSelect = async (movie: TMDBSearchResult) => {
    setIsLoadingDetails(true);
    try {
      const [movieDetails, credits] = await Promise.all([
        tmdbService.getMovieDetails(movie.id),
        tmdbService.getMovieCredits(movie.id)
      ]);
      
      const seoData = tmdbService.generateSEOData(movieDetails, credits.cast);
      onMovieSelect(movieDetails, credits.cast, seoData);
    } catch (error) {
      console.error('Failed to load movie details:', error);
    } finally {
      setIsLoadingDetails(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search movies on TMDb..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="pl-10 bg-input border-luxury-border"
          />
        </div>
        <Button onClick={handleSearch} disabled={isSearching}>
          {isSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : "Search"}
        </Button>
      </div>

      {searchResults.length > 0 && (
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {searchResults.map((movie) => (
            <Card key={movie.id} className="cursor-pointer hover:bg-muted/50 border-luxury-border">
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="w-16 h-24 bg-muted rounded-lg flex-shrink-0 overflow-hidden">
                    {movie.poster_path && (
                      <img
                        src={tmdbService.getImageUrl(movie.poster_path)}
                        alt={movie.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold text-foreground">{movie.title}</h3>
                      <Button
                        size="sm"
                        onClick={() => handleMovieSelect(movie)}
                        disabled={isLoadingDetails}
                      >
                        {isLoadingDetails ? <Loader2 className="w-4 h-4 animate-spin" /> : "Select"}
                      </Button>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(movie.release_date).getFullYear()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        {movie.vote_average.toFixed(1)}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {movie.overview}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default TMDBSearch;
