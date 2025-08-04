import { useState, useEffect } from "react";
import { Search, Upload, Edit3, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import MovieEditModal from "./MovieEditModal";

interface Movie {
  id: string;
  title: string;
  status: string;
  download_count: number;
  rating: number;
  qualities: string[];
  created_at: string;
  poster_path: string | null;
  overview?: string;
  release_date?: string;
  category?: string;
}

interface MoviesTabProps {
  onUploadMovie: () => void;
}

const MoviesTab = ({ onUploadMovie }: MoviesTabProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const { toast } = useToast();

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('movies')
        .select(`
          *,
          movie_qualities (quality)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      const formattedMovies = data.map(movie => ({
        id: movie.id,
        title: movie.title,
        status: movie.status || 'draft',
        download_count: movie.download_count || 0,
        rating: movie.rating || 0,
        qualities: movie.movie_qualities?.map(q => q.quality) || [],
        created_at: movie.created_at,
        poster_path: movie.poster_path,
        overview: movie.overview,
        release_date: movie.release_date,
        category: movie.category
      }));

      setMovies(formattedMovies);
    } catch (error) {
      console.error('Error fetching movies:', error);
      toast({
        title: "Error",
        description: "Failed to load movies.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteMovie = async (movieId: string) => {
    try {
      const { error } = await supabase
        .from('movies')
        .delete()
        .eq('id', movieId);

      if (error) {
        throw error;
      }

      toast({
        title: "Success",
        description: "Movie deleted successfully.",
      });

      fetchMovies(); // Refresh the list
    } catch (error) {
      console.error('Error deleting movie:', error);
      toast({
        title: "Error",
        description: "Failed to delete movie.",
        variant: "destructive",
      });
    }
  };

  const handleEditMovie = (movie: Movie) => {
    setEditingMovie(movie);
    setShowEditModal(true);
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
    setEditingMovie(null);
  };

  const handleMovieUpdated = () => {
    fetchMovies(); // Refresh the list after update
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <TabsContent value="movies" className="space-y-6">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <h2 className="text-lg md:text-xl font-semibold text-foreground">Movie Management</h2>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full lg:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full sm:w-64 bg-card border-luxury-border"
            />
          </div>
          <Button className="gap-2 bg-primary hover:bg-primary/90 justify-center" onClick={onUploadMovie}>
            <Upload className="w-4 h-4" />
            Upload Movie
          </Button>
        </div>
      </div>

      <Card className="border-luxury-border">
        <CardHeader>
          <CardTitle>Recent Movies</CardTitle>
          <CardDescription>Manage your movie library with quality options</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredMovies.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No movies found.
                </div>
              ) : (
                filteredMovies.map((movie) => (
                  <div key={movie.id} className="flex flex-col lg:flex-row items-start lg:items-center justify-between p-4 border border-luxury-border rounded-lg gap-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-1">
                      <div className="w-16 h-24 bg-muted rounded-lg flex-shrink-0 overflow-hidden">
                        {movie.poster_path && (
                          <img
                            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                            alt={movie.title}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div className="space-y-2 flex-1">
                        <h3 className="font-semibold text-foreground">{movie.title}</h3>
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge 
                            variant={movie.status === "published" ? "default" : "secondary"}
                            className={movie.status === "published" ? "bg-accent text-accent-foreground" : ""}
                          >
                            {movie.status}
                          </Badge>
                          <span className="text-xs md:text-sm text-muted-foreground">
                            {movie.download_count} downloads
                          </span>
                          <span className="text-xs md:text-sm text-muted-foreground">
                            ★ {movie.rating}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {movie.qualities.map((quality) => (
                            <Badge key={quality} variant="outline" className="text-xs border-luxury-border">
                              {quality}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row lg:flex-col xl:flex-row items-center gap-2">
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={`/movie/${movie.id}`}>
                          <Eye className="w-4 h-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleEditMovie(movie)}>
                        <Edit3 className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-destructive hover:text-destructive"
                        onClick={() => deleteMovie(movie.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <MovieEditModal
        isOpen={showEditModal}
        onClose={handleEditModalClose}
        movie={editingMovie}
        onMovieUpdated={handleMovieUpdated}
      />
    </TabsContent>
  );
};

export default MoviesTab;
