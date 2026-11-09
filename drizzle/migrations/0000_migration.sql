CREATE TABLE public.videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  prompt text NOT NULL,
  mode text NOT NULL DEFAULT 'text',
  style text NOT NULL DEFAULT 'realistic',
  aspect_ratio text NOT NULL DEFAULT '16:9',
  job_id text,
  status text NOT NULL DEFAULT 'queued',
  error text,
  storage_path text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.videos TO authenticated;
GRANT ALL ON public.videos TO service_role;
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own select" ON public.videos FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "own insert" ON public.videos FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own update" ON public.videos FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "own delete" ON public.videos FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "own video read" ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'videos' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "own video write" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'videos' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "own video delete" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'videos' AND (storage.foldername(name))[1] = auth.uid()::text);