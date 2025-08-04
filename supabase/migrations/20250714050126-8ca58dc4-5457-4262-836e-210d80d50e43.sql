-- Reset the admin user password to ensure it's correctly set
UPDATE auth.users 
SET encrypted_password = crypt('mehraj786@', gen_salt('bf'))
WHERE email = 'me@ehra.tech';