/* The intro runs on every fresh page load, never gates access to the page. */
(() => {
  const intro = document.getElementById('pmf-intro');
  if (!intro) return;
  const started = performance.now();
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.classList.add('pmf-loading');
  let finished = false;
  let timer;
  const finish = () => {
    if (finished) return;
    finished = true;
    clearTimeout(timer);
    document.documentElement.classList.remove('pmf-loading');
    intro.classList.add('intro-leaving');
    setTimeout(() => intro.remove(), reduced ? 0 : 800);
  };
  window.finishPMFIntro = () => {
    const hero = document.getElementById('heroParallaxImg');
    const imageReady = hero?.decode ? hero.decode().catch(() => {}) : Promise.resolve();
    imageReady.then(() => {
      if (!finished) timer = setTimeout(finish, reduced ? 0 : Math.max(0, 1500 - (performance.now() - started)));
    });
  };
  // Keyboard users can proceed immediately; slow or failed dependencies never trap visitors.
  document.addEventListener('keydown', finish, { once:true });
  setTimeout(finish, reduced ? 0 : 3500);
})();
