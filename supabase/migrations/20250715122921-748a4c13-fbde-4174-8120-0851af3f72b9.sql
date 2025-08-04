-- Add multiple download links support to movie qualities
CREATE TABLE IF NOT EXISTS public.movie_quality_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  movie_quality_id UUID NOT NULL REFERENCES public.movie_qualities(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  language TEXT DEFAULT 'en',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on the new table
ALTER TABLE public.movie_quality_links ENABLE ROW LEVEL SECURITY;

-- Create policies for movie_quality_links
CREATE POLICY "Anyone can view active movie quality links"
  ON public.movie_quality_links
  FOR SELECT
  USING (is_active = true OR has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'moderator'::app_role));

CREATE POLICY "Admins and moderators can manage movie quality links"
  ON public.movie_quality_links
  FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'moderator'::app_role));

-- Add trigger for updated_at
CREATE TRIGGER update_movie_quality_links_updated_at
  BEFORE UPDATE ON public.movie_quality_links
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Add indexes for better performance
CREATE INDEX idx_movie_quality_links_movie_quality_id ON public.movie_quality_links(movie_quality_id);
CREATE INDEX idx_movie_quality_links_active ON public.movie_quality_links(is_active);