-- Create the cust_info table to store customer credentials
create table if not exists public.cust_info (
  cust_id uuid primary key references auth.users(id) on delete cascade,
  cust_secret text not null,
  agent_code text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.cust_info enable row level security;

-- Create RLS policies so users can only access their own data
create policy "Users can view their own customer info"
  on public.cust_info for select
  using (auth.uid() = cust_id);

create policy "Users can insert their own customer info"
  on public.cust_info for insert
  with check (auth.uid() = cust_id);

create policy "Users can update their own customer info"
  on public.cust_info for update
  using (auth.uid() = cust_id);

create policy "Users can delete their own customer info"
  on public.cust_info for delete
  using (auth.uid() = cust_id);

-- Create an index for faster lookups
create index if not exists cust_info_cust_id_idx on public.cust_info(cust_id);

-- Create a function to update the updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$;

-- Create a trigger to automatically update updated_at
drop trigger if exists on_cust_info_updated on public.cust_info;

create trigger on_cust_info_updated
  before update on public.cust_info
  for each row
  execute function public.handle_updated_at();
