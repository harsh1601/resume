(() => {
  'use strict';
  const section = document.querySelector('[data-blog-comments]');
  if (!section) return;
  const config = window.BLOG_COMMENTS;
  const list = section.querySelector('[data-comment-list]');
  const listStatus = section.querySelector('[data-comment-list-status]');
  const more = section.querySelector('[data-comment-more]');
  const retry = section.querySelector('[data-comment-retry]');
  const form = section.querySelector('form');
  const formStatus = section.querySelector('[data-comment-form-status]');
  const submit = form.querySelector('button[type="submit"]');
  const article = location.pathname;
  let offset = 0;
  const headers = config && { apikey: config.publishableKey, Authorization: `Bearer ${config.anonJwt}` };
  const setStatus = (node, message, error = false) => {
    node.textContent = message;
    node.classList.toggle('comment-error', error);
  };
  const request = async (url, options = {}) => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    try { return await fetch(url, { ...options, signal: controller.signal }); }
    finally { clearTimeout(timeout); }
  };
  const renderComment = comment => {
    const item = document.createElement('article');
    item.className = 'reader-comment';
    const header = document.createElement('header');
    const name = document.createElement('h3');
    name.textContent = comment.display_name;
    const date = document.createElement('time');
    date.dateTime = comment.created_at;
    date.textContent = new Date(comment.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    header.append(name, date);
    const body = document.createElement('p');
    body.textContent = comment.body;
    item.append(header, body);
    if (comment.author_reply) {
      const reply = document.createElement('div');
      reply.className = 'comment-author-reply';
      const author = document.createElement('strong');
      author.textContent = 'Harsh Agarwal · Author';
      const text = document.createElement('p');
      text.textContent = comment.author_reply;
      reply.append(author, text);
      item.append(reply);
    }
    return item;
  };
  const load = async (append = false) => {
    if (!config) { setStatus(listStatus, 'Comments are temporarily unavailable.', true); submit.disabled = true; return; }
    more.disabled = true;
    retry.hidden = true;
    list.setAttribute('aria-busy', 'true');
    setStatus(listStatus, 'Loading comments…');
    try {
      const url = new URL(config.functionUrl);
      url.searchParams.set('article', article);
      url.searchParams.set('offset', String(append ? offset : 0));
      const response = await request(url, { headers });
      if (!response.ok) throw new Error('load');
      const data = await response.json();
      if (!Array.isArray(data.comments)) throw new Error('load');
      if (!append) { list.replaceChildren(); offset = 0; }
      data.comments.forEach(comment => list.append(renderComment(comment)));
      offset += data.comments.length;
      more.hidden = !data.hasMore;
      setStatus(listStatus, offset ? '' : 'No comments yet. Start the conversation.');
    } catch {
      setStatus(listStatus, 'We could not load comments. Please try again.', true);
      retry.hidden = false;
    } finally {
      more.disabled = false;
      list.removeAttribute('aria-busy');
    }
  };
  more.addEventListener('click', () => load(true));
  retry.addEventListener('click', () => load(offset > 0));
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (!config || submit.disabled || !form.reportValidity()) return;
    const fields = new FormData(form);
    const values = Object.fromEntries(fields.entries());
    const payload = {
      article,
      name: String(values.name || '').trim(),
      comment: String(values.comment || '').trim(),
      website: String(values.website || '')
    };
    if (payload.name.length < 2 || payload.comment.length < 10) {
      setStatus(formStatus, 'Please enter your name and a comment of at least 10 characters.', true);
      return;
    }
    submit.disabled = true;
    submit.textContent = 'Submitting…';
    setStatus(formStatus, '');
    try {
      const response = await request(config.functionUrl, {
        method: 'POST', headers: { ...headers, 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (!response.ok) { setStatus(formStatus, data.error || 'We could not submit your comment. Please try again.', true); return; }
      form.reset();
      setStatus(formStatus, data.message || 'Thank you. Your comment is awaiting approval.');
    } catch {
      setStatus(formStatus, 'We could not confirm submission. Please check your connection and try again later.', true);
    } finally {
      submit.disabled = false;
      submit.textContent = 'Submit for review';
    }
  });
  load();
})();
