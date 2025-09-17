-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;

-- Users can view their own complete profile
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

-- Create a security definer function to check if we should allow basic profile viewing
CREATE OR REPLACE FUNCTION public.can_view_basic_profile(profile_user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  -- Allow if requesting own profile (full access)
  IF auth.uid() = profile_user_id THEN
    RETURN TRUE;
  END IF;
  
  -- Allow authenticated users to see basic info of others
  -- but this will be limited by what fields the application queries
  IF auth.role() = 'authenticated' THEN
    RETURN TRUE;
  END IF;
  
  RETURN FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE SET search_path = public;

-- Policy for basic profile viewing (app must limit which fields it requests)
CREATE POLICY "Basic profile access for authenticated users" 
ON public.profiles 
FOR SELECT 
USING (public.can_view_basic_profile(user_id));