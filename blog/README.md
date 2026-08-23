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
