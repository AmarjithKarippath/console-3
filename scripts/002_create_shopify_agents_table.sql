-- Create shopify_agents table
CREATE TABLE IF NOT EXISTS public.shopify_agents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL,
  store_url VARCHAR(255),
  shop_subdomain VARCHAR(255),
  api_key TEXT,
  api_secret TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(customer_id)
);

-- Enable RLS
ALTER TABLE public.shopify_agents ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public access" ON public.shopify_agents
  FOR ALL USING (true);
