# Blog Publishing Workflow

The blog is published at `https://agrharsh.com/blog/` and uses static HTML on GitHub Pages.

## Domain Setup

No DNS change is needed for `https://agrharsh.com/blog/` because it is a folder path under the existing `agrharsh.com` GitHub Pages site.

For `https://blog.agrharsh.com`, use an explicit `CNAME` DNS record for `blog` pointing to `harsh1601.github.io` only after deciding how the subdomain should be hosted. GitHub Pages allows one custom domain in the repository `CNAME` file, so the current canonical setup should remain `agrharsh.com` unless the subdomain is handled by a redirect or a separate Pages site. Do not use a wildcard DNS record.

## Add a New Article

1. Copy `blog/articles/template.html` to a dated, readable slug, for example `blog/articles/2026-09-01-digital-public-infrastructure-lessons.html`.
2. Replace the title, description, canonical URL, Open Graph fields, `BlogPosting` JSON-LD fields, article date, summary, category, and article body.
3. Change `<meta name="robots" content="noindex, nofollow">` to `<meta name="robots" content="index, follow, max-image-preview:large">`.
4. Add a new article card to `blog/index.html`, above older articles:

```html
<article class="blog-post-card">
  <time datetime="2026-09-01">1 September 2026</time>
  <h3><a href="articles/2026-09-01-digital-public-infrastructure-lessons.html">Article Title</a></h3>
  <p>A short two-line summary that appears on the blog index.</p>
  <div class="blog-post-meta">
    <div class="blog-tags">
      <span>Digital Public Infrastructure</span>
      <span>Architecture</span>
    </div>
    <a class="blog-read-more" href="articles/2026-09-01-digital-public-infrastructure-lessons.html" aria-label="Read Article Title">Read article <i class="bi bi-arrow-right"></i></a>
  </div>
</article>
```

5. Add the article URL to `sitemap.xml`.

Keep the blog index manually ordered newest-first. This keeps the site fully static and makes the article list visible to readers, search engines, and social previews without relying on JavaScript or a build step.

## Reader comments and moderation

Each article and the template includes a display name comment form. Readers do not need an account. Comments are stored in the separate `agrharsh-blog-comments` Supabase project (`qrrwcyhxcqorttdbdzfc`) and remain `pending` until approved. No email address is collected or stored. Pending/rejected submissions are never returned by the public comments endpoint.

### Review and reply

1. Open https://supabase.com/dashboard/project/qrrwcyhxcqorttdbdzfc/editor and select **blog_comments**. Sign in with your Supabase account.
2. Filter `status` to `pending`. Review `display_name`, `body`, `article_path`.
3. Change `status` to `approved` to publish, or `rejected` to keep it private. Save the row.
4. To reply, enter your response in `author_reply` on an approved row. It appears beneath the comment labelled **Harsh Agarwal · Author**.
5. To withdraw a previously approved comment, set it to `rejected`. Avoid putting private contact details in public comments or replies.

Approval is manual. This version does not send email notifications. Display names are reader-supplied and do not verify identity.

### New articles

Keep the comments markup, CSS and scripts from `articles/template.html`. Register the new canonical path and title as a row in **blog_comment_articles**; leave `comments_enabled` true. The form associates submissions with `location.pathname`. Never reuse another article's path.

### Service and maintenance

- Source: `supabase/comments.sql` and `supabase/functions/blog-comments/index.ts`.
- Public client settings: `assets/js/comments-config.js`. Its publishable key and legacy anon JWT are public credentials, not secrets. The legacy JWT is used only because the function gateway has `verify_jwt = true`. Never put a service-role or secret key in the website.
- The Edge Function returns only approved display names, text, dates and author replies. All raw tables have RLS and no anon/authenticated grants or policies; deny-all is intentional. Only the service role and the owner's Supabase dashboard manage submissions.
- Submissions have server-side field limits, a honeypot and atomic three-per-hour limits by a salted daily network hash. This is basic abuse prevention, not a guarantee against determined bots. Raw network addresses are not stored.
- Comments are rendered using `textContent`, so reader HTML and scripts are displayed as text.
- Public reads are paginated. Only approved comments are visible, with only public display fields.
- The service does not load advertising or third-party comment widgets. Supabase processes the form data.
- If the Supabase project is paused or unreachable, the form shows an error rather than claiming success. Check the project dashboard to restore service.
- Retain comments only as long as needed for discussion and moderation; delete records on reasonable removal requests.
