-- Run this in Supabase SQL Editor to create the table

create table if not exists vips (
  id bigint primary key,
  check_in date,
  check_out date,
  data jsonb not null,
  created_at timestamptz default now()
);

-- Allow public read/write (the app uses anon key)
alter table vips enable row level security;

create policy "Allow all" on vips
  for all
  using (true)
  with check (true);
