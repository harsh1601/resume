-- Reader submissions are accessible only through the Edge Function.
create table public.blog_comment_articles (
  path text primary key check (path ~ '^/blog/articles/[a-z0-9-]+\.html$'),
  title text not null,
  comments_enabled boolean not null default true
);
create table public.blog_comments (
  id uuid primary key default gen_random_uuid(),
  article_path text not null references public.blog_comment_articles(path),
  display_name text not null check (char_length(display_name) between 2 and 80),
  body text not null check (char_length(body) between 10 and 3000),
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  author_reply text check (char_length(author_reply) <= 3000),
  created_at timestamptz not null default now()
);
create index blog_comments_public_list on public.blog_comments(article_path, created_at desc, id desc) where status = 'approved';
create index blog_comments_review_queue on public.blog_comments(status, created_at desc);
create table public.blog_comment_limits (
  key text primary key,
  attempts integer not null default 0,
  window_started timestamptz not null default now()
);
alter table public.blog_comment_articles enable row level security;
alter table public.blog_comments enable row level security;
alter table public.blog_comment_limits enable row level security;
revoke all on public.blog_comment_articles, public.blog_comments, public.blog_comment_limits from anon, authenticated;
grant all on public.blog_comment_articles, public.blog_comments, public.blog_comment_limits to service_role;
-- Atomic limits prevent concurrent submissions from bypassing the limit.
create function public.submit_blog_comment(p_article text, p_name text, p_body text, p_network_key text)
returns uuid language plpgsql security invoker set search_path = '' as $$
declare v_key text; v_attempts integer; v_id uuid;
begin
  if not exists(select 1 from public.blog_comment_articles where path=p_article and comments_enabled) then
    raise exception 'Article not available' using errcode='22023';
  end if;
  if char_length(p_name) not between 2 and 80 or
     char_length(p_body) not between 10 and 3000 or p_network_key !~ '^[0-9a-f]{64}$' then
    raise exception 'Invalid comment' using errcode='22023';
  end if;
  -- Delete expired counters; no raw network addresses are stored.
  delete from public.blog_comment_limits where window_started < now() - interval '2 days';
  foreach v_key in array array['network:'||p_network_key] loop
    insert into public.blog_comment_limits as limits(key,attempts) values(v_key,1)
    on conflict(key) do update set
      attempts=case when limits.window_started < now()-interval '1 hour' then 1 else limits.attempts+1 end,
      window_started=case when limits.window_started < now()-interval '1 hour' then now() else limits.window_started end
    returning attempts into v_attempts;
    if v_attempts > 3 then raise exception 'Please wait before submitting another comment' using errcode='P0001'; end if;
  end loop;
  insert into public.blog_comments(article_path,display_name,body)
  values(p_article,p_name,p_body) returning id into v_id;
  return v_id;
end; $$;
revoke all on function public.submit_blog_comment(text,text,text,text) from public, anon, authenticated;
grant execute on function public.submit_blog_comment(text,text,text,text) to service_role;
insert into public.blog_comment_articles(path,title) values
('/blog/articles/from-information-interoperability-to-trusted-economic-ecosystem.html','From Information Interoperability to Trusted Economic Ecosystem'),
('/blog/articles/designing-citizen-scale-platforms-for-continuous-evolution.html','Designing Citizen-Scale Platforms for Continuous Evolution');
