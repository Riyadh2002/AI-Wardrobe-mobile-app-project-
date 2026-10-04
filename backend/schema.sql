-- ==============================================================================
-- AIWardrobe (ClosetAI) Supabase Database Schema (Idempotent / Safe to Re-run)
-- ==============================================================================

-- 1. Enable UUID Extension
create extension if not exists "uuid-ossp";

-- 2. Clothing Items Table
create table if not exists public.clothing_items (
    id uuid primary key default gen_random_uuid(),
    user_id uuid,
    name text not null,
    category text not null,
    color text not null,
    color_hex text default '#18181B',
    style text not null default 'Minimal',
    season text not null default 'All Year',
    brand text,
    image_url text not null,
    is_favorite boolean default false,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Outfits Table
create table if not exists public.outfits (
    id uuid primary key default gen_random_uuid(),
    user_id uuid,
    name text not null,
    occasion text not null,
    style text not null,
    confidence_score integer default 95,
    explanation text,
    items jsonb default '[]'::jsonb,
    is_favorite boolean default false,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. User Profiles Table
create table if not exists public.user_profiles (
    id uuid primary key default gen_random_uuid(),
    user_id uuid unique,
    full_name text,
    email text,
    preferred_styles text[] default array['Minimal', 'Casual']::text[],
    favorite_colors text[] default array['#000000', '#FFFFFF', '#1E3A8A']::text[],
    avatar_url text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Enable Row Level Security (RLS)
alter table public.clothing_items enable row level security;
alter table public.outfits enable row level security;
alter table public.user_profiles enable row level security;

-- Drop and recreate policies safely
drop policy if exists "Allow public access to clothing_items" on public.clothing_items;
create policy "Allow public access to clothing_items" on public.clothing_items for all using (true) with check (true);

drop policy if exists "Allow public access to outfits" on public.outfits;
create policy "Allow public access to outfits" on public.outfits for all using (true) with check (true);

drop policy if exists "Allow public access to user_profiles" on public.user_profiles;
create policy "Allow public access to user_profiles" on public.user_profiles for all using (true) with check (true);

-- 6. Storage Bucket for Garment Photos
insert into storage.buckets (id, name, public)
values ('wardrobe-images', 'wardrobe-images', true)
on conflict (id) do nothing;

drop policy if exists "Public Access to wardrobe-images" on storage.objects;
create policy "Public Access to wardrobe-images"
on storage.objects for select
using ( bucket_id = 'wardrobe-images' );

drop policy if exists "Public Upload to wardrobe-images" on storage.objects;
create policy "Public Upload to wardrobe-images"
on storage.objects for insert
with check ( bucket_id = 'wardrobe-images' );
