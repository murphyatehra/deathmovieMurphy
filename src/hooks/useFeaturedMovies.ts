
import { useState, useEffect, useCallback } from 'react';
import { getFeaturedMovies } from '@/services/databaseService';

export interface FeaturedMovie {
  id: string;
  movie_id: string;
  section_type: string;
  display_order: number;
  is_active: boolean;
  movies: {
    id: string;
    title: string;
    overview?: string;
    poster_path?: string;
    backdrop_path?: string;
    release_date?: string;
    rating?: number;
    genre_ids?: number[];
    category?: string;
    movie_qualities?: Array<{
      quality: string;
      download_link: string;
      file_size?: string;
    }>;
  };
}

export const useFeaturedMovies = (sectionType: string = 'popular', limit?: number) => {
  const [featuredMovies, setFeaturedMovies] = useState<FeaturedMovie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFeaturedMovies = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getFeaturedMovies(sectionType, limit);
      setFeaturedMovies(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching featured movies:', err);
      setError('Failed to fetch featured movies');
      setFeaturedMovies([]);
    } finally {
      setLoading(false);
    }
  }, [sectionType, limit]);

  useEffect(() => {
    fetchFeaturedMovies();
  }, [fetchFeaturedMovies]);

  return { featuredMovies, loading, error, refetch: fetchFeaturedMovies };
};
