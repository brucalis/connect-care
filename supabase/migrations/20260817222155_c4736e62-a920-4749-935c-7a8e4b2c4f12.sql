-- Create app_role enum
create type public.app_role as enum ('admin', 'moderator', 'user');

-- Profiles table
create table public.profiles (
    id uuid primary key references auth.users(id) on delete cascade,
    full_name text,
    avatar_url text,
    theme_preference text default 'light',
    updated_at timestamptz default now()
);

grant select, insert, update on public.profiles to authenticated;
grant all on public.profiles to service_role;

alter table public.profiles enable row level security;

create policy "Users can view their own profile"
on public.profiles for select
to authenticated
using (auth.uid() = id);

create policy "Users can update their own profile"
on public.profiles for update
to authenticated
using (auth.uid() = id);

-- User roles table
create table public.user_roles (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users(id) on delete cascade not null,
    role app_role not null default 'user',
    unique (user_id, role)
);

grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;

alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = _user_id
      and role = _role
  )
$$;

-- Campaigns table
create table public.campaigns (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users(id) on delete cascade not null,
    name text not null,
    description text,
    channel text check (channel in ('Instagram', 'Facebook', 'Google', 'WhatsApp', 'Email', 'TikTok', 'Others')),
    budget numeric,
    start_date date,
    end_date date,
    status text default 'planning' check (status in ('planning', 'active', 'paused', 'completed')),
    color text,
    created_at timestamptz default now()
);

grant select, insert, update, delete on public.campaigns to authenticated;
grant all on public.campaigns to service_role;

alter table public.campaigns enable row level security;

create policy "Users can manage their own campaigns"
on public.campaigns for all
to authenticated
using (auth.uid() = user_id);

-- Tasks table
create table public.tasks (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users(id) on delete cascade not null,
    campaign_id uuid references public.campaigns(id) on delete cascade,
    title text not null,
    description text,
    due_date date,
    priority text default 'medium' check (priority in ('low', 'medium', 'high')),
    status text default 'pending' check (status in ('pending', 'in_progress', 'completed')),
    created_at timestamptz default now()
);

grant select, insert, update, delete on public.tasks to authenticated;
grant all on public.tasks to service_role;

alter table public.tasks enable row level security;

create policy "Users can manage their own tasks"
on public.tasks for all
to authenticated
using (auth.uid() = user_id);

-- Profile trigger on auth.users
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  
  insert into public.user_roles (user_id, role)
  values (new.id, 'user');
  
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();