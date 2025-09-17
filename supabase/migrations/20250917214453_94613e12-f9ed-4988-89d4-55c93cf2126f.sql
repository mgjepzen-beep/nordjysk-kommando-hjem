-- Update profiles table to better handle Discord authentication data
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS discord_avatar_url TEXT,
ADD COLUMN IF NOT EXISTS discord_discriminator TEXT,
ADD COLUMN IF NOT EXISTS discord_global_name TEXT;

-- Update the handle_new_user function to handle Discord data properly
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  INSERT INTO public.profiles (
    user_id, 
    display_name, 
    avatar_url, 
    discord_username, 
    discord_id,
    discord_avatar_url,
    discord_discriminator,
    discord_global_name
  )
  VALUES (
    NEW.id,
    COALESCE(
      NEW.raw_user_meta_data ->> 'global_name',
      NEW.raw_user_meta_data ->> 'full_name', 
      NEW.raw_user_meta_data ->> 'name',
      NEW.raw_user_meta_data ->> 'preferred_username'
    ),
    NEW.raw_user_meta_data ->> 'avatar_url',
    NEW.raw_user_meta_data ->> 'preferred_username',
    NEW.raw_user_meta_data ->> 'provider_id',
    NEW.raw_user_meta_data ->> 'avatar_url',
    NEW.raw_user_meta_data ->> 'discriminator',
    NEW.raw_user_meta_data ->> 'global_name'
  );
  RETURN NEW;
END;
$function$;