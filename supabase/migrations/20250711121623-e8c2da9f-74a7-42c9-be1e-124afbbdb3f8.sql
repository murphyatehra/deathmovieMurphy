-- Update TMDB API key
UPDATE public.api_settings SET key_value = 'aab79fe987b80fdd74356532914419c3' WHERE key_name = 'TMDB_API_KEY';

-- Insert TMDB access token if not exists
INSERT INTO public.api_settings (key_name, key_value, description)
VALUES ('TMDB_ACCESS_TOKEN', 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYWI3OWZlOTg3YjgwZmRkNzQzNTY1MzI5MTQ0MTljMyIsIm5iZiI6MTc1MTI5MzA1Ny42NjIwMDAyLCJzdWIiOiI2ODYyOWM4MWVhMDFhMTliOTUwZDk4ZWUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.y2JrguZIMc9O5q_KIO5WVhe3anmJEBXF4Di2I-avP9s', 'TMDB API Bearer Token for authenticated requests')
ON CONFLICT (key_name) DO UPDATE SET 
key_value = EXCLUDED.key_value,
updated_at = now();