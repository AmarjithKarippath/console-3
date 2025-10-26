-- Create cust_requirements table
CREATE TABLE IF NOT EXISTS public.cust_requirements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  requirements TEXT NOT NULL,
  subscription VARCHAR(100) NOT NULL,
  contact_number VARCHAR(20) NOT NULL,
  website_address VARCHAR(255),
  email_address VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.cust_requirements ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public access" ON public.cust_requirements
  FOR ALL USING (true);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_cust_requirements_email 
  ON public.cust_requirements(email_address);
