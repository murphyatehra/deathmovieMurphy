
import { supabase } from '@/integrations/supabase/client';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export interface TMDBGenre {
  id: number;
  name: string;
}

export interface TMDBMovie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
  genres: TMDBGenre[];
  adult: boolean;
  original_language: string;
  popularity: number;
  vote_count: number;
  runtime: number;
}

export interface TMDBSearchResult {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
  adult: boolean;
  original_language: string;
  popularity: number;
  vote_count: number;
}

export interface TMDBSearchResponse {
  page: number;
  results: TMDBSearchResult[];
  total_pages: number;
  total_results: number;
}

export interface TMDBCastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

export interface TMDBCreditsResponse {
  id: number;
  cast: TMDBCastMember[];
  crew: any[];
}

const getApiKey = async (): Promise<string> => {
  console.log('Fetching TMDB API key from database...');
  
  try {
    const { data, error } = await supabase
      .from('api_settings')
      .select('key_value')
      .eq('key_name', 'TMDB_API_KEY')
      .eq('is_active', true)
      .maybeSingle();

    if (error) {
      console.error('Error fetching TMDB API key:', error);
      throw new Error('Failed to fetch TMDB API key from database');
    }

    if (!data?.key_value) {
      console.error('TMDB API key not found in database');
      throw new Error('TMDB API key not configured in database');
    }

    console.log('TMDB API key retrieved successfully');
    return data.key_value;
  } catch (error) {
    console.error('Error getting API key:', error);
    throw error;
  }
};

export const searchMovies = async (query: string): Promise<TMDBSearchResult[]> => {
  console.log('Searching movies with query:', query);
  
  try {
    const apiKey = await getApiKey();
    const url = `${TMDB_BASE_URL}/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}&language=en-US&page=1&include_adult=false`;
    
    console.log('Making TMDB API request...');
    const response = await fetch(url);
    
    if (!response.ok) {
      console.error('TMDB API error:', response.status, response.statusText);
      throw new Error(`TMDB API error: ${response.status} ${response.statusText}`);
    }

    const data: TMDBSearchResponse = await response.json();
    console.log('Search results:', data.results?.length || 0, 'movies found');
    return data.results;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

export const getMovieDetails = async (movieId: number): Promise<TMDBMovie> => {
  console.log('Fetching movie details for ID:', movieId);
  
  try {
    const apiKey = await getApiKey();
    const url = `${TMDB_BASE_URL}/movie/${movieId}?api_key=${apiKey}&language=en-US`;
    
    console.log('Making TMDB API request for details...');
    const response = await fetch(url);
    
    if (!response.ok) {
      console.error('TMDB API error:', response.status, response.statusText);
      throw new Error(`TMDB API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Movie details fetched successfully');
    return data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

export const getMovieCredits = async (movieId: number): Promise<TMDBCreditsResponse> => {
  console.log('Fetching movie credits for ID:', movieId);
  
  try {
    const apiKey = await getApiKey();
    const url = `${TMDB_BASE_URL}/movie/${movieId}/credits?api_key=${apiKey}&language=en-US`;
    
    console.log('Making TMDB API request for credits...');
    const response = await fetch(url);
    
    if (!response.ok) {
      console.error('TMDB API error:', response.status, response.statusText);
      throw new Error(`TMDB API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Movie credits fetched successfully');
    return data;
  } catch (error) {
    console.error('Error fetching movie credits:', error);
    throw error;
  }
};

export const getImageUrl = (path: string | null): string => {
  if (!path) return '/placeholder.svg';
  return `${TMDB_IMAGE_BASE_URL}${path}`;
};

export const getPopularMovies = async (): Promise<TMDBSearchResponse> => {
  console.log('Fetching popular movies...');
  
  try {
    const apiKey = await getApiKey();
    const url = `${TMDB_BASE_URL}/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
    
    console.log('Making TMDB API request for popular movies...');
    const response = await fetch(url);
    
    if (!response.ok) {
      console.error('TMDB API error:', response.status, response.statusText);
      throw new Error(`TMDB API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Popular movies fetched:', data.results?.length || 0);
    return data;
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    throw error;
  }
};

export const generateSEOData = (movie: TMDBMovie, cast: TMDBCastMember[]) => {
  return {
    title: `${movie.title} (${new Date(movie.release_date).getFullYear()}) - Download HD Movies`,
    description: movie.overview || `Watch and download ${movie.title} in high quality. ${movie.genres?.map(g => g.name).join(', ')} movie featuring ${cast.slice(0, 3).map(c => c.name).join(', ')}.`,
    keywords: [
      movie.title,
      ...movie.genres?.map(g => g.name) || [],
      ...cast.slice(0, 5).map(c => c.name),
      'download',
      'HD',
      'movie'
    ].join(', ')
  };
};

// Create a service object for backward compatibility
export const tmdbService = {
  searchMovies,
  getMovieDetails,
  getMovieCredits,
  getImageUrl,
  getPopularMovies,
  generateSEOData
};
