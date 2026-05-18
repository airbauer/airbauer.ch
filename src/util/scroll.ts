export function smoothScrollTo(target: HTMLElement, duration = 500) {
  const start = window.scrollY;
  const targetRect = target.getBoundingClientRect();
  const end = start + targetRect.top;
  const startTime = performance.now();

  function tick(now: number) {
    const elapsed = now - startTime;
    const t = Math.min(elapsed / duration, 1);

    const eased = 1 - Math.pow(1 - t, 3);

    window.scrollTo(0, start + (end - start) * eased);

    if (t < 1) {
      requestAnimationFrame(tick);
    }
  }

  requestAnimationFrame(tick);
}
