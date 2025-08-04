import { useState, useEffect } from 'react';
import { getMoviesFromDatabase } from '@/services/databaseService';

export interface Movie {
  id: string;
  title: string;
  year: number;
  rating: number;
  genre: string[];
  duration: string;
  poster: string;
  backdrop?: string;
  overview?: string;
  release_date?: string;
  category?: string;
  status?: string;
}

export const useMovies = (category?: string, limit?: number) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const data = await getMoviesFromDatabase(category, limit);
        
        // Transform database data to match Movie interface
        const transformedMovies = data.map((movie: any) => ({
          id: movie.id,
          title: movie.title,
          year: movie.release_date ? new Date(movie.release_date).getFullYear() : new Date().getFullYear(),
          rating: movie.rating || 0,
          genre: Array.isArray(movie.genre_ids) ? movie.genre_ids.map((id: number) => getGenreName(id)) : [],
          duration: "120 min", // Default duration, could be added to database
          poster: movie.poster_path ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` : 'https://images.unsplash.com/photo-1489599134017-7aa99e9a3b8c?w=300&h=450&fit=crop',
          backdrop: movie.backdrop_path ? `https://image.tmdb.org/t/p/w800${movie.backdrop_path}` : 'https://images.unsplash.com/photo-1489599134017-7aa99e9a3b8c?w=800&h=450&fit=crop',
          overview: movie.overview,
          release_date: movie.release_date,
          category: movie.category,
          status: movie.status
        }));
        
        setMovies(transformedMovies);
        setError(null);
      } catch (err) {
        console.error('Error fetching movies:', err);
        setError('Failed to fetch movies');
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [category, limit]);

  return { movies, loading, error };
};

// Helper function to convert genre IDs to names
const getGenreName = (id: number): string => {
  const genreMap: { [key: number]: string } = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Science Fiction",
    10770: "TV Movie",
    53: "Thriller",
    10752: "War",
    37: "Western"
  };
  
  return genreMap[id] || "Unknown";
};