<script lang="ts">
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  let opacity = 0;
  let scale = 1;
  let raf: number | null = null;
  let timeout: ReturnType<typeof setTimeout>;

  function mouseMove(e: MouseEvent) {
    targetX = e.clientX;
    targetY = e.clientY;
    opacity = 1;

    clearTimeout(timeout);
    timeout = setTimeout(() => {
      opacity = 0;
    }, 1000);

    if (raf === null) {
      raf = requestAnimationFrame(tick);
    }
  }

  function tick() {
    currentX += (targetX - currentX) * 0.15;
    currentY += (targetY - currentY) * 0.15;

    if (Math.abs(targetX - currentX) > 0.5 || Math.abs(targetY - currentY) > 0.5) {
      raf = requestAnimationFrame(tick);
    } else {
      currentX = targetX;
      currentY = targetY;
      raf = null;
    }
  }
</script>

<svelte:window
  on:mousemove={mouseMove}
  on:mousedown={() => (scale = 1.25)}
  on:mouseup={() => (scale = 1)}
/>

<div
  class="pointer-ring"
  style="transform: translateX({currentX - 15}px) translateY({currentY -
    15}px) scale({scale})"
  style:opacity
></div>

<style lang="scss">
  .pointer-ring {
    left: 0;
    top: 0;
    height: 30px;
    width: 30px;
    border-radius: 100px;
    border: 1px solid var(--text-secondary);
    position: fixed;
    z-index: 30;
    opacity: 0;
    pointer-events: none;
    transition: 0.3s opacity var(--bezier-one);

    @media (pointer: coarse) {
      display: none;
    }
  }
</style>
