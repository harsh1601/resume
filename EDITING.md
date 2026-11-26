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
- Spelling: British throughout ("organisation", "programme", "modernise"). Keep the schema.org type name `Organization` in structured data as it is.
- Voice: the hero and tiles avoid "I" and "my" (implied subject, for example "At GSTN, leads..."). On the resume, completed work is in past tense and current duties in present tense.
- Full stops: every card description, outcome line and resume bullet ends with one.
- Dates: "2016 – Present", "Jan 2012 – Jun 2016" (type `&ndash;`).

---

## 3. Homepage: `index.html`

In the order a visitor sees it.

| Section on the page | What it contains | Search for | ~Line |
|---|---|---|---|
| (not visible) Search and sharing text | Browser tab title, Google description, LinkedIn/WhatsApp preview text | `<title>`, `name="description"`, `og:title`, `og:description`, `twitter:title`, `twitter:description` | 18–44 |
| (not visible) Structured data for search engines | Name, job title, description, certifications | `"jobTitle"`, `"description"` | 82–180 |
| Top bar (small screens) | Name and title shown after scrolling | `hm-header-identity` | 194 |
| Hero: title line | "Vice President – Technology at GSTN" | `hm-eyebrow` | 220 |
| Hero: positioning line (Title Case) | "Leading Technology Organisations That Build and Evolve..." | `hm-positioning` | 224 |
| Hero: intro lines (experience, GSTN role, API ecosystem line) | "25 years of experience across government and industry..." | `hm-lead` | 225–229 |
| Hero: buttons | Selected work / Read the essays / Full resume | `hm-cta` | 230 |
| Four proof numbers | 5 lakh concurrency, 250+ integrations, 167 team members, $6.5M+ ACV, with captions | `class="hm-metric"` | 243–246 |
| Note under the numbers | "Concurrency and integration figures relate to the GST System..." | `hm-note` | 248 |
| Areas of Leadership | Four tiles: Technology Strategy & Architecture, Organisations & Delivery, Ecosystems & Interoperability, Business Process Engineering | `<h2>Areas of Leadership</h2>` | 252–287 |
| Selected Programmes | Four cards: GST System, e-Invoicing and GST API Ecosystem, Passport Seva, Telecom O/BSS (each has an outcome line; GST System carries the scale figures, e-Invoicing the 1.2 crore, 99.9% and 30 ms figures) | `<h2>Selected Programmes` | 288–324 |
| Recent Essays | Two article cards (title, date, summary) | `<h2>Recent Essays</h2>` | 325–349 |
| Areas of Interest (menu: Interests; opportunities Harsh wants to take up) | Three interest tiles on the left; keynote card (thumbnail, title, YouTube and LinkedIn buttons) on the right | `<h2>Areas of Interest`, `hm-feature` | 350–385 |
| Education & Certifications | Degrees, then four certification links | `<h2>Education &amp; Certifications` | 386–406 |
| Let's Connect | Heading, LinkedIn and Download CV buttons | `<h2>Let's Connect` | 407–416 |

**Keynote card links:** search for `youtu.be/COU5Mw4KwME` (YouTube) and `lnkd.in/p/gJVEFADy` (LinkedIn post). The thumbnail is `assets/img/keynote-transforming-risk-trusted-data.jpg`.

---

## 4. Resume page: `resume/index.html`

| Section on the page | Search for | ~Line |
|---|---|---|
| Tab title and search description | `<title>`, `name="description"` | 18–19 |
| Dark header: intro sentence and buttons | `rs-head` | 100 |
| Career Highlights: GSTN role (six bullets) | `Vice President &ndash; Technology, Goods` | 119 |
| Aricent role | `Senior Project Manager, Aricent` | 133 |
| HCL role | `Associate Project Manager, HCL` | 144 |
| TCS role (Passport Seva, Melbourne) | `IT Analyst, Tata Consultancy` | 152 |
| Early career | `Developer, SOWSIA` | 161 |
| Right column: Education | `<h4>Education</h4>` | 167 |
| Right column: Certifications | `<h4>Certifications</h4>` | 173 |
| Right column: Domains, Technology (includes AWS and GCP, blue/green), Leadership | `<h4>Domains</h4>`, `<h4>Technology</h4>`, `<h4>Leadership</h4>` | 180–194 |

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
| GST System scale: 1.6 crore active taxpayers, concurrency 1.5 → 3 → 5 lakh, 250+ integrations, 1.2 crore e-invoices a day, 99.9% uptime, 30 ms lookup | `1.6 crore`, `5 lakh`, `250+`, `1.2 crore`, `99.9%` | `index.html` (numbers strip, GST and e-invoicing cards), `resume/index.html` (first two GSTN bullets) |
| 167-member cross-shore teams; Aricent ACV $6.5M+ | `167`, `6.5M` | `index.html` (numbers strip, Organisations & Delivery tile, Aricent card), `resume/index.html` (Aricent bullet) |
| Education and certifications | `IMT Ghaziabad`, `Certified SAFe` | `index.html` (credentials and structured data), `resume/index.html` |
| LinkedIn address | `linkedin.com/in/agrharsh` | every page (top bar and buttons) |
| CV file (every Download CV link uses this name) | `Harsh_Agarwal.pdf` | `index.html`, `resume/index.html` |

**The CV itself is also a place where these facts live.** The PDF at `assets/Harsh_Agarwal.pdf` is exported from your Word resume (see `CV-CORRECTIONS.md` for the list of Word changes needed). When any fact above changes, update the Word file, export a new PDF from Word, and replace the PDF in `assets/`. Replace `assets/Harsh Agarwal.pdf` (with a space) with the same file.

### Agreed facts (single reference)

| Fact | Exact wording |
|---|---|
| Job title | Vice President – Technology |
| Experience | 25 years (digits, never in words) |
| Active taxpayers | 1.6 crore |
| Concurrent users | Scaled from 1.5 lakh to 3 lakh and now 5 lakh |
| Peak load | 45.43 lakh return transactions in a single day; 7.65 lakh returns and 1.8 lakh payments a day in peak filing periods |
| Integrations | 250+ |
| e-Invoicing | 1.2 crore a day on average; 99.9% uptime; 30 ms average lookup response time |
| Aricent programme | $6.5M+ ACV; $1.3M new business; satisfaction 3/5 to 5/5 in 18 months |
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
