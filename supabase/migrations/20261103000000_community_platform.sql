create extension if not exists pgcrypto;

create type public.community_role as enum (
  'member',
  'trusted_editor',
  'moderator',
  'administrator'
);

create type public.content_status as enum ('draft', 'published', 'hidden');
create type public.report_status as enum ('open', 'reviewing', 'resolved', 'dismissed');

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  username text not null unique check (username ~ '^[A-Za-z0-9_]{3,24}$'),
  display_name text not null default '',
  bio text not null default '' check (char_length(bio) <= 500),
  avatar_url text,
  role public.community_role not null default 'member',
  reputation integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index profiles_username_lower_idx on public.profiles (lower(username));

create function public.is_staff()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.profiles
    where id = (select auth.uid())
      and role in ('moderator', 'administrator')
  );
$$;

create function public.is_editor()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.profiles
    where id = (select auth.uid())
      and role in ('trusted_editor', 'moderator', 'administrator')
  );
$$;

create function public.is_administrator()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.profiles
    where id = (select auth.uid())
      and role = 'administrator'
  );
$$;

create function public.create_profile_for_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  requested_name text;
begin
  requested_name := coalesce(
    nullif(new.raw_user_meta_data ->> 'username', ''),
    nullif(split_part(coalesce(new.email, ''), '@', 1), ''),
    'member'
  );
  requested_name := regexp_replace(requested_name, '[^A-Za-z0-9_]', '', 'g');
  requested_name := left(requested_name, 24);
  if char_length(requested_name) < 3 then
    requested_name := 'member_' || left(replace(new.id::text, '-', ''), 8);
  end if;
  if exists (select 1 from public.profiles where lower(username) = lower(requested_name)) then
    requested_name := left(requested_name, 15) || '_' || left(replace(new.id::text, '-', ''), 8);
  end if;

  insert into public.profiles (id, username, display_name)
  values (new.id, requested_name, left(coalesce(nullif(new.raw_user_meta_data ->> 'display_name', ''), requested_name), 48));
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.create_profile_for_new_user();

create function public.guard_profile_changes()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if new.role is distinct from old.role and not public.is_administrator() then
    raise exception 'Only administrators can change roles';
  end if;
  if new.reputation is distinct from old.reputation
    and not public.is_staff()
    and current_setting('app.internal_reputation_change', true) is distinct from 'true' then
    raise exception 'Only staff can change reputation';
  end if;
  new.updated_at := now();
  return new;
end;
$$;

create trigger profiles_guard_sensitive_fields
  before update on public.profiles
  for each row execute function public.guard_profile_changes();

create table public.forum_categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text not null default '',
  icon text not null default 'message-circle',
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

insert into public.forum_categories (slug, name, description, icon, sort_order) values
  ('introductions', 'Introductions', 'Say hello, meet your neighbors and find your place in the community.', 'handshake', 1),
  ('general', 'General Discussion', 'Community conversations, questions and ideas.', 'messages-square', 2),
  ('showcase', 'Showcase & Creations', 'Share builds, art, projects and things you are proud of.', 'image', 3),
  ('help', 'Help & Support', 'Ask for help from players and community staff.', 'life-buoy', 4),
  ('suggestions', 'Ideas & Feedback', 'Thoughtful suggestions to help the community grow.', 'lightbulb', 5),
  ('announcements', 'Announcements', 'Official community updates and notices.', 'megaphone', 6);

create table public.wiki_categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text not null default '',
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

insert into public.wiki_categories (slug, name, description, sort_order) values
  ('getting-started', 'Getting Started', 'Community guides and first steps.', 1),
  ('community', 'Community', 'How our community works and how to get involved.', 2),
  ('projects', 'Projects', 'Community-led projects and shared resources.', 3),
  ('guides', 'Guides', 'Member-written guides and reference pages.', 4);

create table public.wiki_pages (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  title text not null check (char_length(title) between 3 and 160),
  summary text not null default '' check (char_length(summary) <= 500),
  category_id uuid not null references public.wiki_categories (id),
  content text not null default '' check (char_length(content) <= 100000),
  status public.content_status not null default 'published',
  created_by uuid not null references public.profiles (id),
  updated_by uuid not null references public.profiles (id),
  locked boolean not null default false,
  revision integer not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index wiki_pages_category_updated_idx on public.wiki_pages (category_id, updated_at desc);

create table public.wiki_revisions (
  id uuid primary key default gen_random_uuid(),
  page_id uuid not null references public.wiki_pages (id) on delete cascade,
  version integer not null,
  title text not null,
  summary text not null,
  category_id uuid not null references public.wiki_categories (id),
  content text not null,
  author_id uuid not null references public.profiles (id),
  created_at timestamptz not null default now(),
  unique (page_id, version)
);

create function public.save_wiki_revision()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if tg_op = 'INSERT' then
    new.revision := 1;
  else
    new.revision := old.revision + 1;
    new.updated_at := now();
  end if;

  return new;
end;
$$;

create function public.record_wiki_revision()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.wiki_revisions (page_id, version, title, summary, category_id, content, author_id)
  values (new.id, new.revision, new.title, new.summary, new.category_id, new.content, new.updated_by);
  return new;
end;
$$;

create trigger wiki_pages_revision_prepare
  before insert or update of title, summary, category_id, content on public.wiki_pages
  for each row execute function public.save_wiki_revision();
create trigger wiki_pages_revision_record
  after insert or update of title, summary, category_id, content on public.wiki_pages
  for each row execute function public.record_wiki_revision();

create table public.forum_threads (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.forum_categories (id),
  wiki_page_id uuid references public.wiki_pages (id) on delete cascade,
  author_id uuid not null references public.profiles (id),
  title text not null check (char_length(title) between 5 and 180),
  body text not null check (char_length(body) between 1 and 20000),
  status public.content_status not null default 'published',
  pinned boolean not null default false,
  locked boolean not null default false,
  reply_count integer not null default 0,
  last_activity_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index forum_threads_category_activity_idx on public.forum_threads (category_id, last_activity_at desc);
create index forum_threads_author_idx on public.forum_threads (author_id, created_at desc);

create table public.forum_posts (
  id uuid primary key default gen_random_uuid(),
  thread_id uuid not null references public.forum_threads (id) on delete cascade,
  author_id uuid not null references public.profiles (id),
  body text not null check (char_length(body) between 1 and 20000),
  status public.content_status not null default 'published',
  mentioned_user_ids uuid[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index forum_posts_thread_created_idx on public.forum_posts (thread_id, created_at);
create index forum_posts_author_idx on public.forum_posts (author_id, created_at desc);

create function public.guard_forum_mutations()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  affected_thread uuid;
begin
  if tg_table_name = 'forum_threads' then
    if tg_op = 'UPDATE' then
      if (new.pinned is distinct from old.pinned or new.locked is distinct from old.locked or new.status is distinct from old.status)
        and not public.is_staff() then
        raise exception 'Only moderators can pin, lock or moderate threads';
      end if;
      if new.author_id is distinct from old.author_id then
        raise exception 'Thread authors cannot be changed';
      end if;
      if not public.is_staff() and (
        new.reply_count is distinct from old.reply_count
        or new.last_activity_at is distinct from old.last_activity_at
        or new.wiki_page_id is distinct from old.wiki_page_id
        or new.category_id is distinct from old.category_id
      ) and current_setting('app.internal_thread_stats', true) is distinct from 'true' then
        raise exception 'Only moderators can change thread metadata';
      end if;
      new.updated_at := now();
    end if;
    if tg_op = 'INSERT' and new.category_id = (
      select id from public.forum_categories where slug = 'announcements'
    ) and not public.is_staff() then
      raise exception 'Only moderators can post announcements';
    end if;
    return new;
  end if;

  affected_thread := case when tg_op = 'DELETE' then old.thread_id else new.thread_id end;
  if tg_op = 'UPDATE' and new.status is distinct from old.status and not public.is_staff() then
    raise exception 'Only moderators can moderate posts';
  end if;
  if tg_op = 'UPDATE' then
    new.updated_at := now();
    if new.author_id is distinct from old.author_id or new.thread_id is distinct from old.thread_id then
      raise exception 'Post author and thread cannot be changed';
    end if;
  end if;

  perform set_config('app.internal_thread_stats', 'true', true);
  update public.forum_threads
  set reply_count = greatest(
        0,
        (select count(*)::integer from public.forum_posts where thread_id = affected_thread and status = 'published')
      ),
      last_activity_at = now()
  where id = affected_thread;
  perform set_config('app.internal_thread_stats', 'false', true);
  if tg_op = 'DELETE' then
    return old;
  end if;
  return new;
end;
$$;

create trigger forum_threads_guard
  before update on public.forum_threads
  for each row execute function public.guard_forum_mutations();

create trigger forum_posts_guard
  after insert or update or delete on public.forum_posts
  for each row execute function public.guard_forum_mutations();

create table public.post_reactions (
  post_id uuid not null references public.forum_posts (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  reaction text not null check (reaction in ('like', 'helpful', 'celebrate', 'thanks')),
  created_at timestamptz not null default now(),
  primary key (post_id, user_id, reaction)
);

create table public.content_reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid not null references public.profiles (id),
  target_type text not null check (target_type in ('thread', 'post', 'wiki_page', 'profile')),
  target_id uuid not null,
  reason text not null check (char_length(reason) between 8 and 1000),
  status public.report_status not null default 'open',
  reviewer_id uuid references public.profiles (id),
  resolution_note text not null default '',
  created_at timestamptz not null default now(),
  reviewed_at timestamptz
);

create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  kind text not null,
  title text not null,
  body text not null default '',
  href text,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create index notifications_user_created_idx on public.notifications (user_id, created_at desc);

create table public.private_messages (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid not null references public.profiles (id),
  recipient_id uuid not null references public.profiles (id),
  subject text not null check (char_length(subject) between 1 and 160),
  body text not null check (char_length(body) between 1 and 10000),
  read_at timestamptz,
  created_at timestamptz not null default now(),
  check (sender_id <> recipient_id)
);

create index private_messages_inbox_idx on public.private_messages (recipient_id, created_at desc);

create table public.badges (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text not null default '',
  icon text not null default 'award',
  created_at timestamptz not null default now()
);

create table public.user_badges (
  user_id uuid not null references public.profiles (id) on delete cascade,
  badge_id uuid not null references public.badges (id) on delete cascade,
  awarded_by uuid references public.profiles (id),
  awarded_at timestamptz not null default now(),
  primary key (user_id, badge_id)
);

insert into public.badges (slug, name, description, icon) values
  ('first-steps', 'First Steps', 'Welcomed into the Origin Ascendants community.', 'sparkles'),
  ('helpful-member', 'Helpful Member', 'Recognized for supporting fellow community members.', 'heart-handshake'),
  ('wiki-contributor', 'Wiki Contributor', 'Recognized for improving the shared community wiki.', 'book-open-check');

create function public.update_reputation_for_reaction()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  reacted_post uuid;
  reactor uuid;
  adjustment integer;
  post_author uuid;
begin
  if tg_op = 'DELETE' then
    reacted_post := old.post_id;
    reactor := old.user_id;
    adjustment := -1;
  else
    reacted_post := new.post_id;
    reactor := new.user_id;
    adjustment := 1;
  end if;
  select author_id into post_author from public.forum_posts where id = reacted_post;
  if post_author is not null and post_author <> reactor then
    perform set_config('app.internal_reputation_change', 'true', true);
    update public.profiles set reputation = greatest(0, reputation + adjustment) where id = post_author;
    perform set_config('app.internal_reputation_change', 'false', true);
  end if;
  if tg_op = 'DELETE' then
    return old;
  end if;
  return new;
end;
$$;

create trigger one_reaction_per_member_per_post
  after insert or delete on public.post_reactions
  for each row execute function public.update_reputation_for_reaction();
create unique index post_reactions_one_per_member_idx on public.post_reactions (post_id, user_id);

create table public.activity_events (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid not null references public.profiles (id) on delete cascade,
  kind text not null,
  summary text not null,
  href text,
  created_at timestamptz not null default now()
);

create index activity_events_created_idx on public.activity_events (created_at desc);
create index activity_events_actor_idx on public.activity_events (actor_id, created_at desc);

create table public.announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 3 and 180),
  body text not null check (char_length(body) between 1 and 10000),
  author_id uuid not null references public.profiles (id),
  published boolean not null default false,
  pinned boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.profiles (id),
  action text not null,
  target_type text not null,
  target_id uuid,
  details jsonb not null default '{}',
  created_at timestamptz not null default now()
);

create function public.enforce_content_rate_limit()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  recent_count integer;
begin
  if tg_table_name = 'forum_posts' then
    select count(*) into recent_count
    from public.forum_posts
    where author_id = new.author_id and created_at > now() - interval '1 minute';
    if recent_count >= 8 then
      raise exception 'Posting too quickly. Please wait a minute.';
    end if;
  elsif tg_table_name = 'forum_threads' then
    select count(*) into recent_count
    from public.forum_threads
    where author_id = new.author_id and created_at > now() - interval '1 hour';
    if recent_count >= 5 then
      raise exception 'Too many new threads. Please try again later.';
    end if;
  elsif tg_table_name = 'private_messages' then
    select count(*) into recent_count
    from public.private_messages
    where sender_id = new.sender_id and created_at > now() - interval '1 hour';
    if recent_count >= 20 then
      raise exception 'Too many messages sent. Please try again later.';
    end if;
  elsif tg_table_name = 'wiki_pages' then
    if tg_op = 'INSERT' then
      select count(*) into recent_count
      from public.wiki_pages
      where created_by = new.created_by and created_at > now() - interval '1 hour';
      if recent_count >= 10 then
        raise exception 'Too many wiki pages created. Please try again later.';
      end if;
    else
      select count(*) into recent_count
      from public.wiki_revisions
      where author_id = new.updated_by and created_at > now() - interval '1 minute';
      if recent_count >= 20 then
        raise exception 'Too many wiki edits. Please wait a minute.';
      end if;
    end if;
  elsif tg_table_name = 'content_reports' then
    select count(*) into recent_count
    from public.content_reports
    where reporter_id = new.reporter_id and created_at > now() - interval '1 day';
    if recent_count >= 10 then
      raise exception 'Too many reports submitted. Please try again later.';
    end if;
  elsif tg_table_name = 'post_reactions' then
    select count(*) into recent_count
    from public.post_reactions
    where user_id = new.user_id and created_at > now() - interval '1 minute';
    if recent_count >= 30 then
      raise exception 'Too many reactions. Please try again later.';
    end if;
  end if;
  return new;
end;
$$;

create trigger forum_posts_rate_limit before insert on public.forum_posts
  for each row execute function public.enforce_content_rate_limit();
create trigger forum_threads_rate_limit before insert on public.forum_threads
  for each row execute function public.enforce_content_rate_limit();
create trigger private_messages_rate_limit before insert on public.private_messages
  for each row execute function public.enforce_content_rate_limit();
create trigger wiki_pages_rate_limit before insert or update of title, summary, category_id, content on public.wiki_pages
  for each row execute function public.enforce_content_rate_limit();
create trigger content_reports_rate_limit before insert on public.content_reports
  for each row execute function public.enforce_content_rate_limit();
create trigger post_reactions_rate_limit before insert on public.post_reactions
  for each row execute function public.enforce_content_rate_limit();

create function public.notify_post_mentions()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  mentioned record;
  thread_title text;
begin
  select title into thread_title from public.forum_threads where id = new.thread_id;
  for mentioned in
    select distinct p.id
    from regexp_matches(new.body, '@([A-Za-z0-9_]{3,24})', 'g') as mention(parts)
    join public.profiles p on lower(p.username) = lower(mention.parts[1])
    where p.id <> new.author_id
  loop
    insert into public.notifications (user_id, kind, title, body, href)
    values (
      mentioned.id,
      'mention',
      'You were mentioned',
      left((select username from public.profiles where id = new.author_id) || ' mentioned you in "' || thread_title || '"', 300),
      '/forum/' || new.thread_id::text
    );
  end loop;
  return new;
end;
$$;

create trigger forum_post_mentions
  after insert on public.forum_posts
  for each row execute function public.notify_post_mentions();

create function public.notify_thread_author_of_reply()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  thread_author uuid;
  thread_title text;
  sender_name text;
begin
  select author_id, title into thread_author, thread_title
  from public.forum_threads where id = new.thread_id;
  if thread_author is not null and thread_author <> new.author_id then
    select coalesce(display_name, username) into sender_name
    from public.profiles where id = new.author_id;
    insert into public.notifications (user_id, kind, title, body, href)
    values (
      thread_author,
      'forum_reply',
      'New reply to your discussion',
      left(coalesce(sender_name, 'A community member') || ' replied to "' || thread_title || '"', 300),
      '/forum/' || new.thread_id::text
    );
  end if;
  return new;
end;
$$;

create trigger forum_reply_notification
  after insert on public.forum_posts
  for each row when (new.status = 'published')
  execute function public.notify_thread_author_of_reply();

create function public.record_forum_post_activity()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  thread_title text;
begin
  select title into thread_title from public.forum_threads where id = new.thread_id;
  insert into public.activity_events (actor_id, kind, summary, href)
  values (new.author_id, 'forum_reply', 'Replied to: ' || coalesce(thread_title, 'a discussion'), '/forum/' || new.thread_id::text);
  return new;
end;
$$;

create trigger forum_post_activity
  after insert on public.forum_posts
  for each row when (new.status = 'published')
  execute function public.record_forum_post_activity();

create function public.notify_new_private_message()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  sender_name text;
begin
  select coalesce(display_name, username) into sender_name
  from public.profiles where id = new.sender_id;
  insert into public.notifications (user_id, kind, title, body, href)
  values (
    new.recipient_id,
    'private_message',
    'New private message',
    left(coalesce(sender_name, 'A community member') || ' sent you a message: ' || new.subject, 300),
    '/messages/' || new.id::text
  );
  return new;
end;
$$;

create trigger private_message_notification
  after insert on public.private_messages
  for each row execute function public.notify_new_private_message();

create function public.record_thread_activity()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.activity_events (actor_id, kind, summary, href)
  values (new.author_id, 'forum_thread', 'Started a discussion: ' || new.title, '/forum/' || new.id::text);
  return new;
end;
$$;

create trigger forum_thread_activity
  after insert on public.forum_threads
  for each row when (new.status = 'published')
  execute function public.record_thread_activity();

create function public.record_wiki_activity()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.activity_events (actor_id, kind, summary, href)
  values (
    new.updated_by,
    case when tg_op = 'INSERT' then 'wiki_create' else 'wiki_edit' end,
    case when tg_op = 'INSERT' then 'Created a wiki page: ' else 'Updated a wiki page: ' end || new.title,
    '/wiki/' || new.slug
  );
  return new;
end;
$$;

create trigger wiki_page_activity
  after insert or update of title, summary, category_id, content on public.wiki_pages
  for each row when (new.status = 'published')
  execute function public.record_wiki_activity();

create function public.admin_set_profile_role(target_user_id uuid, new_role public.community_role)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  previous_role public.community_role;
  target_name text;
begin
  if not public.is_administrator() then
    raise exception 'Administrator access required';
  end if;
  select role, username into previous_role, target_name
  from public.profiles where id = target_user_id for update;
  if not found then
    raise exception 'Profile not found';
  end if;
  update public.profiles set role = new_role where id = target_user_id;
  insert into public.audit_logs (actor_id, action, target_type, target_id, details)
  values (
    (select auth.uid()),
    'profile.role_changed',
    'profile',
    target_user_id,
    jsonb_build_object('username', target_name, 'previous_role', previous_role, 'new_role', new_role)
  );
end;
$$;

create function public.staff_moderate_content(target_type text, target_id uuid, new_status public.content_status)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  target_title text;
begin
  if not public.is_staff() then
    raise exception 'Moderator access required';
  end if;
  if target_type = 'thread' then
    update public.forum_threads set status = new_status where id = target_id returning title into target_title;
  elsif target_type = 'post' then
    update public.forum_posts set status = new_status where id = target_id returning left(body, 120) into target_title;
  elsif target_type = 'wiki_page' then
    update public.wiki_pages set status = new_status where id = target_id returning title into target_title;
  else
    raise exception 'Unsupported content type';
  end if;
  if target_title is null then
    raise exception 'Content not found';
  end if;
  insert into public.audit_logs (actor_id, action, target_type, target_id, details)
  values ((select auth.uid()), 'content.status_changed', target_type, target_id, jsonb_build_object('status', new_status, 'title', target_title));
end;
$$;

create function public.staff_update_thread_controls(target_thread_id uuid, should_pin boolean, should_lock boolean)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  target_title text;
begin
  if not public.is_staff() then
    raise exception 'Moderator access required';
  end if;
  update public.forum_threads set pinned = should_pin, locked = should_lock
  where id = target_thread_id returning title into target_title;
  if target_title is null then
    raise exception 'Discussion not found';
  end if;
  insert into public.audit_logs (actor_id, action, target_type, target_id, details)
  values ((select auth.uid()), 'thread.controls_changed', 'thread', target_thread_id, jsonb_build_object('pinned', should_pin, 'locked', should_lock, 'title', target_title));
end;
$$;

create function public.staff_resolve_report(target_report_id uuid, new_status public.report_status, resolution text)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not public.is_staff() then
    raise exception 'Moderator access required';
  end if;
  if new_status not in ('reviewing', 'resolved', 'dismissed') then
    raise exception 'Invalid report status';
  end if;
  update public.content_reports
  set status = new_status,
      reviewer_id = (select auth.uid()),
      resolution_note = left(coalesce(resolution, ''), 1000),
      reviewed_at = now()
  where id = target_report_id;
  if not found then
    raise exception 'Report not found';
  end if;
  insert into public.audit_logs (actor_id, action, target_type, target_id, details)
  values ((select auth.uid()), 'report.reviewed', 'report', target_report_id, jsonb_build_object('status', new_status));
end;
$$;

create function public.staff_adjust_reputation(target_user_id uuid, adjustment integer, reason text)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  target_name text;
begin
  if not public.is_staff() then
    raise exception 'Moderator access required';
  end if;
  if adjustment = 0 or adjustment < -100 or adjustment > 100 then
    raise exception 'Reputation adjustments must be between -100 and 100';
  end if;
  update public.profiles set reputation = greatest(0, reputation + adjustment)
  where id = target_user_id returning username into target_name;
  if target_name is null then
    raise exception 'Profile not found';
  end if;
  insert into public.audit_logs (actor_id, action, target_type, target_id, details)
  values (
    (select auth.uid()),
    'profile.reputation_adjusted',
    'profile',
    target_user_id,
    jsonb_build_object('username', target_name, 'adjustment', adjustment, 'reason', left(coalesce(reason, ''), 500))
  );
end;
$$;

revoke all on function public.admin_set_profile_role(uuid, public.community_role) from public, anon;
revoke all on function public.staff_moderate_content(text, uuid, public.content_status) from public, anon;
revoke all on function public.staff_update_thread_controls(uuid, boolean, boolean) from public, anon;
revoke all on function public.staff_resolve_report(uuid, public.report_status, text) from public, anon;
revoke all on function public.staff_adjust_reputation(uuid, integer, text) from public, anon;
grant execute on function public.admin_set_profile_role(uuid, public.community_role) to authenticated;
grant execute on function public.staff_moderate_content(text, uuid, public.content_status) to authenticated;
grant execute on function public.staff_update_thread_controls(uuid, boolean, boolean) to authenticated;
grant execute on function public.staff_resolve_report(uuid, public.report_status, text) to authenticated;
grant execute on function public.staff_adjust_reputation(uuid, integer, text) to authenticated;

create function public.staff_award_badge(target_user_id uuid, target_badge_id uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  badge_name text;
begin
  if not public.is_staff() then
    raise exception 'Moderator access required';
  end if;
  select name into badge_name from public.badges where id = target_badge_id;
  if badge_name is null then
    raise exception 'Badge not found';
  end if;
  insert into public.user_badges (user_id, badge_id, awarded_by)
  values (target_user_id, target_badge_id, (select auth.uid()));
  insert into public.audit_logs (actor_id, action, target_type, target_id, details)
  values ((select auth.uid()), 'badge.awarded', 'profile', target_user_id, jsonb_build_object('badge', badge_name));
end;
$$;

revoke all on function public.staff_award_badge(uuid, uuid) from public, anon;
grant execute on function public.staff_award_badge(uuid, uuid) to authenticated;

alter table public.profiles enable row level security;
alter table public.forum_categories enable row level security;
alter table public.wiki_categories enable row level security;
alter table public.wiki_pages enable row level security;
alter table public.wiki_revisions enable row level security;
alter table public.forum_threads enable row level security;
alter table public.forum_posts enable row level security;
alter table public.post_reactions enable row level security;
alter table public.content_reports enable row level security;
alter table public.notifications enable row level security;
alter table public.private_messages enable row level security;
alter table public.badges enable row level security;
alter table public.user_badges enable row level security;
alter table public.activity_events enable row level security;
alter table public.announcements enable row level security;
alter table public.audit_logs enable row level security;

create policy "Profiles are public"
  on public.profiles for select to anon, authenticated using (true);
create policy "Members can update their profile"
  on public.profiles for update to authenticated using (id = (select auth.uid()) or public.is_administrator())
  with check (id = (select auth.uid()) or public.is_administrator());

create policy "Forum categories are public"
  on public.forum_categories for select to anon, authenticated using (true);
create policy "Wiki categories are public"
  on public.wiki_categories for select to anon, authenticated using (true);

create policy "Published wiki pages are public"
  on public.wiki_pages for select to anon, authenticated
  using (status = 'published' or created_by = (select auth.uid()) or public.is_staff());
create policy "Signed-in members can create wiki pages"
  on public.wiki_pages for insert to authenticated
  with check (created_by = (select auth.uid()) and updated_by = (select auth.uid()));
create policy "Authors and editors can update wiki pages"
  on public.wiki_pages for update to authenticated
  using (not locked and (created_by = (select auth.uid()) or public.is_editor()))
  with check (updated_by = (select auth.uid()) and (created_by = (select auth.uid()) or public.is_editor()));
create policy "Staff can moderate wiki pages"
  on public.wiki_pages for update to authenticated
  using (public.is_staff()) with check (public.is_staff());
create policy "Wiki revisions are visible for public pages"
  on public.wiki_revisions for select to anon, authenticated
  using (
    exists (select 1 from public.wiki_pages p where p.id = page_id and p.status = 'published')
    or public.is_staff()
  );

create policy "Published threads are public"
  on public.forum_threads for select to anon, authenticated
  using (status = 'published' or author_id = (select auth.uid()) or public.is_staff());
create policy "Authenticated members can create threads"
  on public.forum_threads for insert to authenticated
  with check (author_id = (select auth.uid()) and status = 'published' and not pinned and not locked);
create policy "Authors can edit unlocked threads"
  on public.forum_threads for update to authenticated
  using (author_id = (select auth.uid()) and not locked)
  with check (author_id = (select auth.uid()));
create policy "Staff can moderate threads"
  on public.forum_threads for update to authenticated
  using (public.is_staff()) with check (public.is_staff());

create policy "Published posts are public"
  on public.forum_posts for select to anon, authenticated
  using (status = 'published' or author_id = (select auth.uid()) or public.is_staff());
create policy "Members can reply to open threads"
  on public.forum_posts for insert to authenticated
  with check (
    author_id = (select auth.uid())
    and status = 'published'
    and exists (select 1 from public.forum_threads t where t.id = thread_id and t.status = 'published' and not t.locked)
  );
create policy "Authors can edit their own posts"
  on public.forum_posts for update to authenticated
  using (author_id = (select auth.uid()))
  with check (author_id = (select auth.uid()));
create policy "Staff can moderate posts"
  on public.forum_posts for update to authenticated
  using (public.is_staff()) with check (public.is_staff());
create policy "Authors and staff can delete posts"
  on public.forum_posts for delete to authenticated
  using (author_id = (select auth.uid()) or public.is_staff());

create policy "Members can read reactions"
  on public.post_reactions for select to anon, authenticated using (true);
create policy "Members can react as themselves"
  on public.post_reactions for insert to authenticated with check (user_id = (select auth.uid()));
create policy "Members can remove their own reactions"
  on public.post_reactions for delete to authenticated using (user_id = (select auth.uid()));

create policy "Members can submit reports"
  on public.content_reports for insert to authenticated
  with check (reporter_id = (select auth.uid()) and status = 'open' and reviewer_id is null);
create policy "Reporters and staff can read reports"
  on public.content_reports for select to authenticated
  using (reporter_id = (select auth.uid()) or public.is_staff());
create policy "Staff can resolve reports"
  on public.content_reports for update to authenticated
  using (public.is_staff()) with check (public.is_staff());

create policy "Members can read their notifications"
  on public.notifications for select to authenticated using (user_id = (select auth.uid()));
create policy "Members can update their notifications"
  on public.notifications for update to authenticated using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));
create policy "Members can read their messages"
  on public.private_messages for select to authenticated
  using (sender_id = (select auth.uid()) or recipient_id = (select auth.uid()));
create policy "Members can send messages"
  on public.private_messages for insert to authenticated
  with check (sender_id = (select auth.uid()));
create policy "Recipients can mark messages read"
  on public.private_messages for update to authenticated
  using (recipient_id = (select auth.uid()))
  with check (recipient_id = (select auth.uid()));

create policy "Badges are public"
  on public.badges for select to anon, authenticated using (true);
create policy "User badges are public"
  on public.user_badges for select to anon, authenticated using (true);
create policy "Staff can award badges"
  on public.user_badges for insert to authenticated with check (public.is_staff());
create policy "Members can read activity"
  on public.activity_events for select to anon, authenticated using (true);
create policy "Published announcements are public"
  on public.announcements for select to anon, authenticated
  using (published or public.is_staff());
create policy "Staff can manage announcements"
  on public.announcements for all to authenticated
  using (public.is_staff()) with check (public.is_staff());
create policy "Administrators can read audit logs"
  on public.audit_logs for select to authenticated using (public.is_administrator());
create policy "Staff can write audit logs"
  on public.audit_logs for insert to authenticated with check (actor_id = (select auth.uid()) and public.is_staff());

grant select on public.profiles, public.forum_categories, public.wiki_categories, public.wiki_pages,
  public.wiki_revisions, public.forum_threads, public.forum_posts, public.post_reactions,
  public.badges, public.user_badges, public.activity_events, public.announcements to anon, authenticated;
grant update (username, display_name, bio, avatar_url) on public.profiles to authenticated;
grant insert, update, delete on public.forum_threads, public.forum_posts, public.post_reactions,
  public.content_reports, public.notifications, public.user_badges, public.announcements to authenticated;
grant insert, update on public.wiki_pages to authenticated;
grant select, update on public.content_reports to authenticated;
grant select on public.notifications to authenticated;
grant update (read_at) on public.notifications to authenticated;
grant select, insert on public.private_messages to authenticated;
grant update (read_at) on public.private_messages to authenticated;
grant select on public.audit_logs to authenticated;
grant insert on public.audit_logs to authenticated;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'community-images',
  'community-images',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

create policy "Community images are publicly readable"
  on storage.objects for select to anon, authenticated
  using (bucket_id = 'community-images');
create policy "Members can upload to their own folder"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'community-images' and (storage.foldername(name))[1] = (select auth.uid())::text);
create policy "Members can update their own uploads"
  on storage.objects for update to authenticated
  using (bucket_id = 'community-images' and owner_id = (select auth.uid())::text)
  with check (bucket_id = 'community-images' and owner_id = (select auth.uid())::text);
create policy "Members can delete their own uploads"
  on storage.objects for delete to authenticated
  using (bucket_id = 'community-images' and owner_id = (select auth.uid())::text);
