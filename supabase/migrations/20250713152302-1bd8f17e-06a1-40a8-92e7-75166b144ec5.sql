
-- First, let's create the admin user with the specified credentials
-- We'll use Supabase's auth.users table insertion (this is a special case)
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'me@ehra.tech',
  crypt('mehraj786@', gen_salt('bf')),
  now(),
  null,
  null,
  '{"provider":"email","providers":["email"]}',
  '{}',
  now(),
  now(),
  '',
  '',
  '',
  ''
);

-- Get the user ID we just created and assign admin role
WITH new_user AS (
  SELECT id FROM auth.users WHERE email = 'me@ehra.tech'
)
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role FROM new_user;

-- Create profile for the admin user
WITH new_user AS (
  SELECT id FROM auth.users WHERE email = 'me@ehra.tech'
)
INSERT INTO public.profiles (user_id, display_name)
SELECT id, 'Admin' FROM new_user;
