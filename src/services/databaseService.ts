import { supabase } from '@/integrations/supabase/client';

export interface MovieData {
  title: string;
  overview?: string;
  poster_path?: string;
  backdrop_path?: string;
  release_date?: string;
  rating?: number;
  genre_ids?: number[];
  tmdb_id?: number;
  category?: string;
  language?: string;
  status?: string;
}

export interface MovieQuality {
  quality: string;
  download_link: string;
  magnet_link?: string;
  file_size?: string;
}

export interface FeaturedMovie {
  id: string;
  movie_id: string;
  section_type: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  created_by?: string;
}

export const saveMovieToDatabase = async (movieData: MovieData) => {
  console.log('Saving movie to database:', movieData);
  
  try {
    const { data: movie, error: movieError } = await supabase
      .from('movies')
      .insert({
        ...movieData,
        created_by: (await supabase.auth.getUser()).data.user?.id,
        status: movieData.status || 'published'
      })
      .select()
      .single();

    if (movieError) {
      console.error('Error saving movie:', movieError);
      throw movieError;
    }

    console.log('Movie saved successfully:', movie);
    return movie;
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
};

export const saveMovieQuality = async (movieId: string, qualityData: MovieQuality) => {
  console.log('Saving movie quality to database:', { movieId, qualityData });
  
  try {
    const { data: quality, error: qualityError } = await supabase
      .from('movie_qualities')
      .insert({
        movie_id: movieId,
        ...qualityData,
        is_active: true
      })
      .select()
      .single();

    if (qualityError) {
      console.error('Error saving movie quality:', qualityError);
      throw qualityError;
    }

    console.log('Movie quality saved successfully:', quality);
    return quality;
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
};

export const getMoviesFromDatabase = async (category?: string, limit?: number) => {
  console.log('Fetching movies from database:', { category, limit });
  
  try {
    let query = supabase
      .from('movies')
      .select(`
        *,
        movie_qualities (*)
      `)
      .eq('status', 'published')
      .order('created_at', { ascending: false });

    if (category) {
      query = query.eq('category', category);
    }

    if (limit) {
      query = query.limit(limit);
    }

    const { data: movies, error } = await query;

    if (error) {
      console.error('Error fetching movies:', error);
      throw error;
    }

    console.log('Movies fetched successfully:', movies?.length || 0);
    return movies || [];
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
};

export const getFeaturedMovies = async (sectionType: string = 'popular', limit?: number) => {
  console.log('Fetching featured movies from database:', { sectionType, limit });
  
  try {
    let query = supabase
      .from('featured_movies')
      .select(`
        *,
        movies (
          *,
          movie_qualities (*)
        )
      `)
      .eq('section_type', sectionType)
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (limit) {
      query = query.limit(limit);
    }

    const { data: featuredMovies, error } = await query;

    if (error) {
      console.error('Error fetching featured movies:', error);
      throw error;
    }

    console.log('Featured movies fetched successfully:', featuredMovies?.length || 0);
    return featuredMovies || [];
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
};

export const addMovieToFeatured = async (movieId: string, sectionType: string = 'popular', displayOrder: number = 0) => {
  console.log('Adding movie to featured:', { movieId, sectionType, displayOrder });
  
  try {
    const { data: featuredMovie, error } = await supabase
      .from('featured_movies')
      .insert({
        movie_id: movieId,
        section_type: sectionType,
        display_order: displayOrder,
        created_by: (await supabase.auth.getUser()).data.user?.id
      })
      .select()
      .single();

    if (error) {
      console.error('Error adding movie to featured:', error);
      throw error;
    }

    console.log('Movie added to featured successfully:', featuredMovie);
    return featuredMovie;
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
};

export const removeMovieFromFeatured = async (featuredMovieId: string) => {
  console.log('Removing movie from featured:', featuredMovieId);
  
  try {
    const { error } = await supabase
      .from('featured_movies')
      .delete()
      .eq('id', featuredMovieId);

    if (error) {
      console.error('Error removing movie from featured:', error);
      throw error;
    }

    console.log('Movie removed from featured successfully');
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
};

export const saveMovieRequest = async (requestData: {
  movie_title: string;
  requester_name?: string;
  email?: string;
  quality?: string;
  language?: string;
  genre?: string;
  release_year?: string;
  additional_info?: string;
}) => {
  console.log('Saving movie request to database:', requestData);
  
  try {
    const { data: request, error } = await supabase
      .from('movie_requests')
      .insert({
        ...requestData,
        status: 'pending'
      })
      .select()
      .single();

    if (error) {
      console.error('Error saving movie request:', error);
      throw error;
    }

    console.log('Movie request saved successfully:', request);
    return request;
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
};

export const getApiSetting = async (keyName: string) => {
  console.log('Fetching API setting:', keyName);
  
  try {
    const { data, error } = await supabase
      .from('api_settings')
      .select('key_value')
      .eq('key_name', keyName)
      .eq('is_active', true)
      .maybeSingle();

    if (error) {
      console.error('Error fetching API setting:', error);
      throw error;
    }

    console.log('API setting fetched:', keyName, data?.key_value ? 'found' : 'not found');
    return data?.key_value;
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
};
