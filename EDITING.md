# Editing the site text

The site is plain HTML. There is no build step: edit a file, save, and the change is live (on the preview or on agrharsh.com, depending on the branch).

**Fastest way to find text:** open the file, press **Ctrl+F** (Cmd+F on Mac) and paste the *Search for* text from the tables below. Line numbers are approximate and drift as the file changes, so trust the search text.

---

## 1. How to edit

**In the browser (no tools needed)**
1. Open the file on GitHub, for example `github.com/harsh1601/resume/blob/site-redesign/index.html`.
2. Click the pencil icon (Edit this file), then use Ctrl+F to find the text.
3. Change only the words between tags. Do not remove any `<`, `>` or `"`.
4. Click **Commit changes** and commit directly to the **site-redesign** branch.
5. If Netlify is connected to the repository, the preview updates by itself. If you use drag-and-drop on Netlify, download the branch zip again and re-upload it.

**Special characters** (type exactly as shown):

| To show | Type |
|---|---|
| & | `&amp;` |
| en dash (–) | `&ndash;` |
| middle dot (·) | `&middot;` |
| registered mark (®) | `&reg;` |
| ordinary apostrophes and quotes | type normally |

---

## 2. Text style rules

- **Section headers** (small label plus big heading above each block): type in Title Case. The site shows them in CAPITALS automatically.
- **Titles and headings** (hero positioning line, card titles, article headings): Title Case. Small words (a, an, and, of, in, the, to, for, with) stay lower case unless first.
- **Everything else** (paragraphs, bullets, captions, links such as "Read article"): sentence case.
- Button labels display in CAPITALS automatically. Type them in sentence case.
- Spelling: the site currently mixes British ("organisation", "programme") and American ("organizations", in the new hero line). Choose one and apply it everywhere.

---

## 3. Homepage: `index.html`

In the order a visitor sees it.

| Section on the page | What it contains | Search for | ~Line |
|---|---|---|---|
| (not visible) Search and sharing text | Browser tab title, Google description, LinkedIn/WhatsApp preview text | `<title>`, `name="description"`, `og:title`, `og:description`, `twitter:title`, `twitter:description` | 18–44 |
| (not visible) Structured data for search engines | Name, job title, description, certifications | `"jobTitle"`, `"description"` | 82–180 |
| Top bar (small screens) | Name and title shown after scrolling | `hm-header-identity` | 194 |
| Hero: title line | "Vice President – Technology at GSTN" | `hm-eyebrow` | 220 |
| Hero: positioning line | "Leading technology organizations that build and evolve..." | `hm-positioning` | 224 |
| Hero: intro lines (experience, GSTN role, API ecosystem line) | "My experience spans 25 years..." | `hm-lead` | 225–229 |
| Hero: buttons | See my work / Read my essays / Full resume | `hm-cta` | 230 |
| Four proof numbers | 1.4 crore, 300,000+, 30 million, 250+ and their captions | `class="hm-metric"` | 243–246 |
| Note under the numbers | "Figures are from publicly available information..." | `hm-note` | 248 |
| What I Lead | Four tiles: Technology Strategy & Architecture, Organisations & Delivery, Ecosystems & Interoperability, Business Process Engineering | `<h2>What I Lead</h2>` | 252–287 |
| Programmes I’ve Shaped and Delivered | Four cards: GST System, e-Invoicing and GST API Ecosystem, Passport Seva, Telecom O/BSS (each has an outcome line) | `<h2>Programmes I’ve Shaped` | 288–324 |
| Recent Essays | Two article cards (title, date, summary) | `<h2>Recent Essays</h2>` | 325–349 |
| Areas of Interest & Recent Keynote | Three interest tiles on the left; keynote card (thumbnail, title, YouTube and LinkedIn buttons) on the right; "Views are my own..." line below | `<h2>Areas of Interest`, `hm-feature`, `hm-disclaimer` | 350–385 |
| Education & Certifications | Degrees, then four certification links | `<h2>Education &amp; Certifications` | 386–406 |
| Let's Connect | Heading, LinkedIn and Download CV buttons | `<h2>Let's Connect` | 407–416 |

**Keynote card links:** search for `youtu.be/COU5Mw4KwME` (YouTube) and `lnkd.in/p/gJVEFADy` (LinkedIn post). The thumbnail is `assets/img/keynote-transforming-risk-trusted-data.jpg`.

---

## 4. Resume page: `resume/index.html`

| Section on the page | Search for | ~Line |
|---|---|---|
| Tab title and search description | `<title>`, `name="description"` | 18–19 |
| Dark header: intro sentence and buttons | `rs-head` | 100 |
| Career Highlights: GSTN role | `Vice President &ndash; Technology, Goods` | 119 |
| Aricent role | `Senior Project Manager, Aricent` | 133 |
| HCL role | `Associate Project Manager, HCL` | 144 |
| TCS role (Passport Seva, Melbourne) | `IT Analyst, Tata Consultancy` | 152 |
| Early career | `Developer, SOWSIA` | 161 |
| Right column: Education | `<h4>Education</h4>` | 167 |
| Right column: Certifications | `<h4>Certifications</h4>` | 173 |
| Right column: Domains, Technology, Leadership | `<h4>Domains</h4>`, `<h4>Technology</h4>`, `<h4>Leadership</h4>` | 180–194 |

Each job is a block of: title line (`<h3>`), dates line (`rs-meta`), then bullets (`<li>`). To add a bullet, copy an existing `<li>...</li>` line.

---

## 5. Blog

### Blog list page: `blog/index.html`

| What | Search for | ~Line |
|---|---|---|
| Tab title | `<title>Blog` | 17 |
| Page heading | `<h1>My Experience` | 159 |
| Introduction paragraph | `blog-intro` | 160 |
| Article cards (title, date, summary, tags) | `blog-post-card` | 172–190 |

### Each article: `blog/articles/<name>.html`

The two articles are laid out slightly differently, so search terms differ.

**Article 1:** `from-information-interoperability-to-trusted-economic-ecosystem.html`

| What | Search for |
|---|---|
| Tab title and search description | `<title>`, `name="description"` |
| Headline (hidden, for search engines; the headline is shown in the banner image) | `visually-hidden` |
| Byline: author, reading time, date | `rel="author"` |
| Opening paragraph | `A perspective from` |
| "Explore the article" contents list | `Explore the article` |
| Section headings in the body | `<h2 id="section-` |
| Sources | `Sources and Further Reading` |
| Editorial note at the end | `Editorial note` |
| Comments headings and labels | `comments-heading`, `Leave a Comment`, `Discussion` |

If you change a section heading, change the matching line in the "Explore the article" list as well.

**Article 2:** `designing-citizen-scale-platforms-for-continuous-evolution.html`

| What | Search for |
|---|---|
| Tab title and search description | `<title>`, `name="description"` |
| Headline shown on the page | `<h1>` |
| Reading time and date | `article-meta-line` |
| Opening paragraph | `article-lead` |
| Section headings in the body | `<h2>` (seven headings, from "A Peak Has a Shape" onward) |
| Comments headings and labels | `comments-heading`, `Leave a Comment`, `Discussion` |

This article has no contents list, sources list or editorial note.

**Both articles:** the top bar (name and title, menu) is the same block as on every other page. Search for `hm-header-identity`.

### Adding a new article
See `blog/README.md` for the steps (copy `blog/articles/template.html`, add a card to `blog/index.html`, add the URL to `sitemap.xml`).

### Comment form text
The button words ("Submit", "Submitting…") are in `assets/js/comments.js`. Everything else on the comment form is in each article's HTML.

---

## 6. The same fact in several places: check all of them

If you change one of these, search for the old value and update every file listed.

| Fact | Search for | Files |
|---|---|---|
| Job title: Vice President – Technology | `Technology at GSTN`, `Vice President &ndash; Technology`, `Vice President - Technology` | `index.html` (header, hero, structured data), `resume/index.html`, `blog/index.html`, both articles, `blog/articles/template.html` |
| 25 years of experience (always digits) | `25 years` | `index.html` (search text, hero, structured data), `resume/index.html` |
| The proof numbers: 1.4 crore taxpayers, 3 lakh+ concurrent users, 250+ integrations (and 30 million e-invoices a day) | `1.4 crore`, `3 lakh`, `250+`, `30 million` | `index.html` (numbers, GST cards), `resume/index.html` (GSTN bullets) |
| 167-member cross-shore teams | `167` | `index.html` (Organisations & Delivery tile), `resume/index.html` (Aricent bullet) |
| Education and certifications | `IMT Ghaziabad`, `Certified SAFe` | `index.html` (credentials and structured data), `resume/index.html` |
| LinkedIn address | `linkedin.com/in/agrharsh` | every page (top bar and buttons) |
| CV file (every Download CV link uses this name) | `Harsh_Agarwal.pdf` | `index.html`, `resume/index.html` |

**The CV itself is also a place where these facts live.** The PDF at `assets/Harsh_Agarwal.pdf` is exported from your Word resume. When any fact above changes, update the Word file, export a new PDF from Word, and replace the PDF in `assets/`. Replace `assets/Harsh Agarwal.pdf` (with a space) with the same file.

### Agreed facts (single reference)

| Fact | Exact wording |
|---|---|
| Job title | Vice President – Technology |
| Experience | 25 years (digits, never in words) |
| Taxpayers | 1.4 crore |
| Concurrent users | 3 lakh+ (from 60,000 in 2017) |
| Integrations | 250+ |
| Cross-shore teams | 167-member cross-shore teams |
| Education | PG Diploma in Management (Business Analytics), IMT Ghaziabad, completing Dec 2026 |
| CV download file | `Harsh_Agarwal.pdf` |

---

## 7. Files and images

| What | Where |
|---|---|
| CV download | `assets/Harsh_Agarwal.pdf`. Replace this file and keep the same name. A second copy, `assets/Harsh Agarwal.pdf`, exists only so old links keep working: replace it with the same file. |
| Your photo | `assets/img/me.jpeg` |
| Link-preview card for the homepage | `assets/img/og-home.png` |
| Keynote thumbnail | `assets/img/keynote-transforming-risk-trusted-data.jpg` |
| Look and feel (colours, spacing) | `assets/css/home.css` (homepage, resume, top bar) and `assets/css/style.css` (blog) |

---

## 8. Before publishing a text change

1. Read the changed section on the preview, on a laptop and on a phone.
2. If you changed a fact, check section 6 so every page agrees.
3. Check the case rules in section 2.
4. Click any link you edited.
