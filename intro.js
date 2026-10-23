/* Loader controller: every navigation/reload, independent of React and motion.css. */
(() => {
  const overlay = document.getElementById('pmf-intro');
  if (!overlay) return;
  const root = document.documentElement;
  const started = performance.now();
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let ready = false, leaving = false, frame = 0, observer;
  const minimum = 2400, deadline = 5000;
  root.classList.add('pmf-loading');
  const percent = document.getElementById('load-percent');
  const label = document.getElementById('load-status');
  const paint = value => {
    overlay.style.setProperty('--load-progress', value.toFixed(2));
    if (percent) percent.textContent = String(Math.floor(value)).padStart(2, '0');
  };
  const finish = () => {
    if (leaving) return;
    leaving = true;
    cancelAnimationFrame(frame);
    clearTimeout(safety);
    observer?.disconnect();
    document.removeEventListener('keydown', onKey);
    reduced.removeEventListener('change', onPreference);
    paint(100);
    if (label) label.textContent = 'Sua próxima trilha começa agora';
    overlay.classList.add('intro-leaving');
    overlay.setAttribute('aria-hidden', 'true');
    overlay.inert = true;
    root.classList.remove('pmf-loading');
    if (overlay.contains(document.activeElement)) document.getElementById('navHamburger')?.focus();
    setTimeout(() => overlay.remove(), reduced.matches ? 0 : 1050);
  };
  const onKey = event => { if (event.key === 'Escape') finish(); };
  const onPreference = event => { if (event.matches) finish(); };
  const safety = setTimeout(finish, deadline);
  const tick = now => {
    if (leaving) return;
    const elapsed = now - started;
    const progress = Math.min(ready ? 100 : 92, 100 * (1 - Math.pow(1 - Math.min(elapsed / minimum, 1), 2)));
    paint(progress);
    if (ready && elapsed >= minimum) { finish(); return; }
    frame = requestAnimationFrame(tick);
  };
  window.finishPMFIntro = () => {
    if (leaving || ready) return;
    const hero = document.querySelector('#dc-root #heroParallaxImg');
    if (!hero) return;
    observer?.disconnect();
    (hero.decode ? hero.decode().catch(() => {}) : Promise.resolve()).then(() => { ready = true; });
  };
  document.getElementById('load-skip')?.addEventListener('click', finish, { once: true });
  document.addEventListener('keydown', onKey);
  reduced.addEventListener('change', onPreference);
  observer = new MutationObserver(() => window.finishPMFIntro());
  observer.observe(document.body, { childList:true, subtree:true });
  window.finishPMFIntro();
  if (reduced.matches) finish();
  else frame = requestAnimationFrame(tick);
})();
