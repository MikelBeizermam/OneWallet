-- =============================================
-- oneWallet - Database Schema
-- Run this in Supabase SQL Editor
-- =============================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ── Profiles ──────────────────────────────────
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  avatar_url text,
  plan text not null default 'free' check (plan in ('free', 'pro')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ── Cards ──────────────────────────────────────
create table if not exists public.cards (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  name text not null,
  category text not null default 'other'
    check (category in ('id', 'license', 'loyalty', 'credit', 'visit', 'other')),
  card_number text,
  expiry_date text,
  image_url text,
  template_id text,
  metadata jsonb not null default '{}',
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.cards enable row level security;

create policy "Users can view own cards"
  on public.cards for select
  using (auth.uid() = user_id);

create policy "Users can insert own cards"
  on public.cards for insert
  with check (auth.uid() = user_id);

create policy "Users can update own cards"
  on public.cards for update
  using (auth.uid() = user_id);

create policy "Users can delete own cards"
  on public.cards for delete
  using (auth.uid() = user_id);

-- Auto-update updated_at
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger cards_updated_at
  before update on public.cards
  for each row execute procedure public.set_updated_at();

-- ── Storage bucket for card images ────────────
insert into storage.buckets (id, name, public)
values ('card-images', 'card-images', true)
on conflict (id) do nothing;

create policy "Users can upload own card images"
  on storage.objects for insert
  with check (bucket_id = 'card-images' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "Anyone can view card images"
  on storage.objects for select
  using (bucket_id = 'card-images');

create policy "Users can delete own card images"
  on storage.objects for delete
  using (bucket_id = 'card-images' and auth.uid()::text = (storage.foldername(name))[1]);
