# Editing the site text

The site is plain HTML. There is no build step: edit a file, save, and the change is live.

## Where each piece of text lives

| What you want to change | File | Look for |
|---|---|---|
| Hero headline and intro | `index.html` | `<section id="top" class="hm-hero">` |
| Proof metrics (1.4 crore, 300,000+ ...) | `index.html` | `<section class="hm-metrics">` |
| "What I Lead" tiles | `index.html` | `<section id="lead"` |
| Selected work cards | `index.html` | `<section id="work"` |
| Essays on the home page | `index.html` | `<section id="perspectives"` |
| Speaking topics and forums | `index.html` | `<section id="speaking"` |
| Credentials | `index.html` | `<section id="credentials"` |
| Contact / LinkedIn band | `index.html` | `<section id="connect"` |
| Full resume | `resume/index.html` | role blocks marked `rs-role` |
| Page title, search description, social text | top of each page | `<title>`, `<meta name="description">`, `og:` tags |
| Blog list | `blog/index.html` | `blog-post-card` |
| New blog article | `blog/README.md` | follow the steps there |
| CV download | `assets/Harsh_Agarwal.pdf` | replace the file, keep the same name |

## Text style rules

- **Section headers** (small label and big heading above each block) display in CAPITALS automatically. Type them in Title Case.
- **Titles and headings** (hero headline, card titles, article headings): Title Case. Small words (a, an, and, of, in, the, to, for, with) stay lower case unless first.
- **Everything else** (paragraphs, bullets, captions, button-style links such as "Read article"): sentence case.
- Keep the same spelling throughout (British: organisation, programme).
- Facts that appear in more than one place: change them everywhere. Search for the old value, for example `25 years`, `250+`, or `Certified SAFe`, across `index.html`, `resume/index.html`, and the JSON-LD block near the top of `index.html`.

## Editing in the browser (no tools needed)

1. Open the file on GitHub, for example `github.com/harsh1601/resume/blob/site-redesign/index.html`.
2. Click the pencil icon (Edit this file). Use Ctrl+F / Cmd+F to find the text.
3. Change only the words between the tags. Do not remove `<`, `>` or quote characters.
4. Click **Commit changes** and keep "Commit directly to the site-redesign branch".

## Previewing

If the Netlify site is connected to the GitHub repository, it redeploys automatically after each commit. Otherwise download the branch zip and drag it onto Netlify again.
