export function smoothScrollTo(target: HTMLElement) {
  function tick() {
    const remaining = target.getBoundingClientRect().top;

    if (Math.abs(remaining) < 1) {
      window.scrollBy(0, remaining);
      return;
    }

    window.scrollBy(0, remaining * 0.12);
    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}
