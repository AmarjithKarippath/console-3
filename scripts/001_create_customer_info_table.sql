-- Create customer_info table
CREATE TABLE IF NOT EXISTS public.customer_info (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL UNIQUE,
  customer_secret TEXT,
  embedded_code TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.customer_info ENABLE ROW LEVEL SECURITY;

-- Create policies (adjust based on your auth requirements)
CREATE POLICY "Allow public read access" ON public.customer_info
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert" ON public.customer_info
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update" ON public.customer_info
  FOR UPDATE USING (true);
