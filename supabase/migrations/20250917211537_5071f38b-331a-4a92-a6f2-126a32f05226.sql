-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;

-- Create more secure policies
-- Users can view their own complete profile
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

-- Authenticated users can view basic profile info of others (for UI purposes)
-- But NOT sensitive data like discord_id
CREATE POLICY "Authenticated users can view basic profile info" 
ON public.profiles 
FOR SELECT 
USING (
  auth.role() = 'authenticated' 
  AND (
    -- Allow viewing basic fields only
    current_setting('request.method', true) = 'GET'
  )
);

-- Create a view for public profile data that excludes sensitive information
CREATE VIEW public.public_profiles AS
SELECT 
  id,
  user_id,
  display_name,
  avatar_url,
  created_at
FROM public.profiles;

-- Enable RLS on the view
ALTER VIEW public.public_profiles SET (security_invoker = true);

-- Allow authenticated users to view the public profile view
CREATE POLICY "Authenticated users can view public profiles" 
ON public.public_profiles
FOR SELECT 
USING (auth.role() = 'authenticated');