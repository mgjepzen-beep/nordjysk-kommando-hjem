DROP POLICY IF EXISTS "Basic profile access for authenticated users" ON public.profiles;
REVOKE ALL ON public.profiles FROM anon;
REVOKE ALL ON public.profiles FROM authenticated;
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
REVOKE EXECUTE ON FUNCTION public.can_view_basic_profile(uuid) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;

CREATE TABLE public.application_rate_limits (
  key text PRIMARY KEY,
  window_start timestamptz NOT NULL DEFAULT now(),
  count integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.application_rate_limits TO service_role;
ALTER TABLE public.application_rate_limits ENABLE ROW LEVEL SECURITY;
CREATE POLICY "No client access" ON public.application_rate_limits FOR ALL TO authenticated USING (false) WITH CHECK (false);

CREATE OR REPLACE FUNCTION public.check_application_rate_limit(_key text, _max integer, _window_seconds integer)
RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE r public.application_rate_limits;
BEGIN
  DELETE FROM public.application_rate_limits WHERE window_start < now() - interval '1 day';
  INSERT INTO public.application_rate_limits(key) VALUES (_key) ON CONFLICT (key) DO NOTHING;
  SELECT * INTO r FROM public.application_rate_limits WHERE key = _key FOR UPDATE;
  IF r.window_start < now() - make_interval(secs => _window_seconds) THEN
    UPDATE public.application_rate_limits SET window_start = now(), count = 1, updated_at = now() WHERE key = _key;
    RETURN true;
  END IF;
  IF r.count >= _max THEN RETURN false; END IF;
  UPDATE public.application_rate_limits SET count = count + 1, updated_at = now() WHERE key = _key;
  RETURN true;
END $$;
REVOKE EXECUTE ON FUNCTION public.check_application_rate_limit(text, integer, integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.check_application_rate_limit(text, integer, integer) TO service_role;