# Blog Publishing Workflow

The blog is published at `https://agrharsh.com/blog/` and uses static HTML on GitHub Pages.

## Add a New Article

1. Copy `blog/articles/template.html` to a dated, readable slug, for example `blog/articles/2026-09-01-digital-public-infrastructure-lessons.html`.
2. Replace the title, description, canonical URL, Open Graph fields, `BlogPosting` JSON-LD fields, article date, summary, category, and article body.
3. Change `<meta name="robots" content="noindex, nofollow">` to `<meta name="robots" content="index, follow, max-image-preview:large">`.
4. Add an entry to `blog/articles/articles.json`:

```json
{
  "title": "Article Title",
  "summary": "A short two-line summary that appears on the blog index.",
  "date": "2026-09-01",
  "url": "articles/2026-09-01-digital-public-infrastructure-lessons.html",
  "tags": ["Digital Public Infrastructure", "Architecture"],
  "status": "published"
}
```

5. Add the article URL to `sitemap.xml`.

The blog index sorts published articles newest-first using the `date` field.
