-- Update the user role to admin for me@ehra.tech
UPDATE public.user_roles 
SET role = 'admin'::app_role 
WHERE user_id = (SELECT id FROM auth.users WHERE email = 'me@ehra.tech');