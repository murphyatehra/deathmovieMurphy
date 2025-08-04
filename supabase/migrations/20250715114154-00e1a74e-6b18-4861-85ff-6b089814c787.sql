
-- Create a table for featured/popular movies
CREATE TABLE public.featured_movies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  movie_id UUID REFERENCES public.movies(id) ON DELETE CASCADE NOT NULL,
  section_type TEXT NOT NULL DEFAULT 'popular',
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  UNIQUE(movie_id, section_type)
);

-- Enable RLS
ALTER TABLE public.featured_movies ENABLE ROW LEVEL SECURITY;

-- Create policies for featured movies
CREATE POLICY "Anyone can view active featured movies" 
  ON public.featured_movies 
  FOR SELECT 
  USING (is_active = true OR has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'moderator'::app_role));

CREATE POLICY "Admins and moderators can manage featured movies" 
  ON public.featured_movies 
  FOR ALL 
  USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'moderator'::app_role));

-- Create trigger to update updated_at column
CREATE TRIGGER update_featured_movies_updated_at
  BEFORE UPDATE ON public.featured_movies
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Add some indexes for better performance
CREATE INDEX idx_featured_movies_section_type ON public.featured_movies(section_type);
CREATE INDEX idx_featured_movies_display_order ON public.featured_movies(display_order);
CREATE INDEX idx_featured_movies_active ON public.featured_movies(is_active);
