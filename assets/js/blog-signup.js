(() => {
  const embed = document.querySelector('.blog-signup-embed');
  if (!embed) return;

  const observer = new MutationObserver(connectLabel);

  function connectLabel() {
    const input = embed.querySelector('.formkit-input[type="email"]');
    if (!input) return;

    observer.disconnect();
    input.id = 'blog-signup-email';
    input.placeholder = 'you@example.com';

    const label = document.createElement('label');
    label.className = 'blog-signup-label';
    label.htmlFor = input.id;
    label.textContent = 'Email address';
    input.before(label);

    embed.querySelector('.blog-signup-fallback').hidden = true;
  }

  // Kit may inject the field before or after this script runs.
  observer.observe(embed, { childList: true, subtree: true });
  connectLabel();
})();
