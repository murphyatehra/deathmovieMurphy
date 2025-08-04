
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Play, Star, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import MovieCard from "@/components/MovieCard";
import MovieImageGallery from "@/components/MovieImageGallery";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import MultiQualityDownloadSection from "@/components/admin/MultiQualityDownloadSection";

interface MovieQualityLink {
  id: string;
  title: string;
  url: string;
  language: string;
}

interface MovieQuality {
  id: string;
  quality: string;
  download_link: string;
  file_size: string;
  magnet_link?: string;
  movie_quality_links?: MovieQualityLink[];
}

interface Movie {
  id: string;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  rating: number;
  genre_ids: number[];
  category: string;
  tmdb_id?: number;
  movie_qualities: MovieQuality[];
}

interface MovieImage {
  id: string;
  title: string;
  url: string;
  type: 'poster' | 'backdrop' | 'uploaded';
}

const MoviePreview = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedQuality, setSelectedQuality] = useState("1080p");
  const [relatedMovies, setRelatedMovies] = useState<Movie[]>([]);
  const [movieImages, setMovieImages] = useState<MovieImage[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchMovie = async () => {
      if (!id) return;

      try {
        const { data, error } = await supabase
          .from('movies')
          .select(`
            *,
            movie_qualities (
              *,
              movie_quality_links (*)
            )
          `)
          .eq('id', id)
          .eq('status', 'published')
          .maybeSingle();

        if (error) {
          console.error('Error fetching movie:', error);
          toast({
            title: "Error",
            description: "Failed to load movie details.",
            variant: "destructive",
          });
          return;
        }

        if (!data) {
          toast({
            title: "Not Found",
            description: "Movie not found or not published.",
            variant: "destructive",
          });
          return;
        }

        setMovie(data);
        
        if (data.movie_qualities && data.movie_qualities.length > 0) {
          setSelectedQuality(data.movie_qualities[0].quality);
        }

        // Create movie images array from TMDB and uploaded images
        const images: MovieImage[] = [];
        
        // Add TMDB poster
        if (data.poster_path) {
          images.push({
            id: 'tmdb-poster',
            title: `${data.title} - Official Poster`,
            url: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
            type: 'poster'
          });
        }
        
        // Add TMDB backdrop
        if (data.backdrop_path) {
          images.push({
            id: 'tmdb-backdrop',
            title: `${data.title} - Backdrop`,
            url: `https://image.tmdb.org/t/p/w780${data.backdrop_path}`,
            type: 'backdrop'
          });
        }

        // Fetch uploaded images from quality links
        data.movie_qualities?.forEach((quality) => {
          quality.movie_quality_links?.forEach((link) => {
            // Check if the URL is an image (contains common image extensions)
            if (link.url && (link.url.includes('.jpg') || link.url.includes('.png') || link.url.includes('.jpeg') || link.url.includes('.webp') || link.url.includes('.gif'))) {
              images.push({
                id: `uploaded-${link.id}`,
                title: link.title || `${data.title} - Screenshot`,
                url: link.url,
                type: 'uploaded'
              });
            }
          });
        });

        setMovieImages(images);

        // Fetch related movies from the same category
        const { data: related, error: relatedError } = await supabase
          .from('movies')
          .select(`
            *,
            movie_qualities (*)
          `)
          .eq('category', data.category)
          .eq('status', 'published')
          .neq('id', id)
          .limit(4);

        if (!relatedError && related) {
          setRelatedMovies(related);
        }
      } catch (error) {
        console.error('Error:', error);
        toast({
          title: "Error",
          description: "An unexpected error occurred.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id, toast]);

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
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading movie details...</p>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Movie Not Found</h1>
          <p className="text-muted-foreground mb-4">The movie you're looking for doesn't exist or isn't published yet.</p>
          <Link to="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const displayMovie = {
    id: movie.id,
    title: movie.title,
    year: movie.release_date ? new Date(movie.release_date).getFullYear() : new Date().getFullYear(),
    rating: movie.rating || 0,
    genre: movie.genre_ids ? movie.genre_ids.map(id => getGenreName(id)) : ["Unknown"],
    duration: "120 min",
    description: movie.overview || "No description available.",
    director: "Unknown",
    cast: ["Unknown"],
    poster: movie.poster_path ? `https://image.tmdb.org/t/p/w400${movie.poster_path}` : 'https://images.unsplash.com/photo-1489599134017-7aa99e9a3b8c?w=400&h=600&fit=crop',
    backdrop: movie.backdrop_path ? `https://image.tmdb.org/t/p/w1200${movie.backdrop_path}` : 'https://images.unsplash.com/photo-1489599134017-7aa99e9a3b8c?w=1200&h=600&fit=crop',
    trailer: ""
  };

  const availableQualities = movie?.movie_qualities
    ?.filter(q => q.movie_quality_links && q.movie_quality_links.length > 0)
    ?.map(q => ({
      quality: q.quality,
      size: q.file_size || 'Unknown',
      price: "Free",
      downloadLinks: q.movie_quality_links
        ?.filter(link => !link.url.includes('.jpg') && !link.url.includes('.png') && !link.url.includes('.jpeg') && !link.url.includes('.webp') && !link.url.includes('.gif'))
        ?.map(link => ({
          id: link.id,
          title: link.title,
          url: link.url,
          language: link.language
        })) || []
    })) || [];

  const convertToMovieCardFormat = (movie: Movie) => ({
    id: movie.id,
    title: movie.title,
    year: movie.release_date ? new Date(movie.release_date).getFullYear() : new Date().getFullYear(),
    rating: movie.rating || 0,
    genre: movie.genre_ids ? movie.genre_ids.map(id => getGenreName(id)) : ["Unknown"],
    duration: "120 min",
    poster: movie.poster_path ? `https://image.tmdb.org/t/p/w400${movie.poster_path}` : 'https://images.unsplash.com/photo-1489599134017-7aa99e9a3b8c?w=300&h=450&fit=crop',
    backdrop: movie.backdrop_path ? `https://image.tmdb.org/t/p/w1200${movie.backdrop_path}` : 'https://images.unsplash.com/photo-1489599134017-7aa99e9a3b8c?w=800&h=450&fit=crop'
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header with back button */}
      <header className="bg-background border-b">
        <div className="container mx-auto px-4 py-4">
          <Link to="/">
            <Button variant="outline" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Movie Poster Section - Smaller */}
          <div className="lg:col-span-1">
            <div className="relative aspect-[3/4] w-full max-w-xs mx-auto">
              <img 
                src={displayMovie.poster} 
                alt={displayMovie.title}
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
              
              {/* View Trailer Button */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <Button 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md font-medium text-sm"
                  size="sm"
                >
                  <Play className="w-4 h-4 mr-2" />
                  View Trailer
                </Button>
              </div>
            </div>
          </div>

          {/* Movie Information Section */}
          <div className="lg:col-span-3 space-y-6">
            {/* Movie Title and Basic Info */}
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">{displayMovie.title}</h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>{displayMovie.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{displayMovie.year}</span>
                </div>
              </div>
              
              {/* Genre Tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {displayMovie.genre.map((genre) => (
                  <Badge 
                    key={genre} 
                    variant="secondary" 
                    className="bg-muted/60 hover:bg-muted text-foreground border border-border px-3 py-1 text-sm font-medium rounded-full"
                  >
                    {genre}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Movie Description */}
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">Overview</h2>
              <p className="text-muted-foreground leading-relaxed">
                {displayMovie.description}
              </p>
            </div>

            {/* Download Section */}
            <div className="space-y-4">
              {availableQualities.length > 0 ? (
                <MultiQualityDownloadSection 
                  availableQualities={availableQualities}
                  selectedQuality={selectedQuality}
                  onQualitySelect={setSelectedQuality}
                />
              ) : (
                <Card>
                  <CardContent className="p-6 text-center">
                    <h2 className="text-xl font-semibold mb-4">Download Options</h2>
                    <p className="text-muted-foreground">
                      Download links are not available for this movie yet. Please check back later.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Movie Images Gallery - Positioned right after download section */}
            {movieImages.length > 0 && (
              <div className="mt-8">
                <MovieImageGallery 
                  images={movieImages} 
                  title={displayMovie.title}
                />
              </div>
            )}

            {/* How to Download Instructions */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">How to Download</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>1. Select your preferred quality from the download options above</p>
                  <p>2. Click on the download button for your chosen quality</p>
                  <p>3. Wait for the download to complete</p>
                  <p>4. Enjoy your movie!</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Movies Section */}
        {relatedMovies.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {relatedMovies.map((relatedMovie) => (
                <MovieCard key={relatedMovie.id} movie={convertToMovieCardFormat(relatedMovie)} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default MoviePreview;
