let raf: number | null = null;

function cancel() {
  if (raf !== null) {
    cancelAnimationFrame(raf);
    raf = null;
  }
}

function onUserScroll() {
  cancel();
}

if (typeof window !== "undefined") {
  window.addEventListener("wheel", onUserScroll, { passive: true });
  window.addEventListener("touchmove", onUserScroll, { passive: true });
  window.addEventListener("keydown", e => {
    if (
      e.key === "ArrowUp" ||
      e.key === "ArrowDown" ||
      e.key === "PageUp" ||
      e.key === "PageDown" ||
      e.key === "Home" ||
      e.key === "End" ||
      e.key === " "
    ) {
      cancel();
    }
  });
}

export function smoothScrollTo(target: HTMLElement) {
  cancel();

  function tick() {
    const remaining = target.getBoundingClientRect().top;

    if (Math.abs(remaining) < 1) {
      window.scrollBy(0, remaining);
      return;
    }

    window.scrollBy(0, remaining * 0.12);
    raf = requestAnimationFrame(tick);
  }

  raf = requestAnimationFrame(tick);
}
