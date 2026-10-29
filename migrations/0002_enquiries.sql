create table if not exists enquiries (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  kind text not null,
  name text not null default '',
  email text not null default '',
  phone text not null default '',
  business text not null default '',
  subject text not null default '',
  message text not null default ''
);
