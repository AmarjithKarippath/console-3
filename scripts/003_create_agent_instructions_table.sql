-- Create agent_instructions table
CREATE TABLE IF NOT EXISTS public.agent_instructions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL,
  section_title TEXT NOT NULL,
  section_subtitle TEXT,
  section_content TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.agent_instructions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public access" ON public.agent_instructions
  FOR ALL USING (true);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_agent_instructions_customer_id 
  ON public.agent_instructions(customer_id);
