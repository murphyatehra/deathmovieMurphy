
-- Create movie requests table
CREATE TABLE public.movie_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  movie_title TEXT NOT NULL,
  release_year TEXT,
  genre TEXT,
  language TEXT,
  quality TEXT DEFAULT '1080p',
  additional_info TEXT,
  requester_name TEXT,
  email TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on movie requests
ALTER TABLE public.movie_requests ENABLE ROW LEVEL SECURITY;

-- Create policies for movie requests
CREATE POLICY "Anyone can submit movie requests" 
ON public.movie_requests FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can view movie requests" 
ON public.movie_requests FOR SELECT 
USING (true);

CREATE POLICY "Admins and moderators can manage movie requests" 
ON public.movie_requests FOR ALL 
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator'));

-- Add updated_at trigger for movie requests
CREATE TRIGGER update_movie_requests_updated_at
  BEFORE UPDATE ON public.movie_requests
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create admin user (you'll need to sign up with email: mj@admin.com and password: mehraj786 through the app)
-- Then run this to make them admin:
-- UPDATE public.user_roles SET role = 'admin' WHERE user_id = (SELECT id FROM auth.users WHERE email = 'mj@admin.com');

-- Add index for better performance
CREATE INDEX idx_movie_requests_status ON public.movie_requests(status);
CREATE INDEX idx_movie_requests_created_at ON public.movie_requests(created_at);
