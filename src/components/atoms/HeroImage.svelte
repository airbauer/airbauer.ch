<script lang="ts">
  import { onMount } from "svelte";

  let finePointer = false;
  let zoom = false;
  let xRotation = 0;
  let yRotation = 0;

  onMount(() => {
    finePointer = window.matchMedia("(pointer: fine)").matches;
  });

  function enterRotate3D(e: MouseEvent) {
    if (!finePointer) return;
    zoom = true;
    const img = e.currentTarget as HTMLImageElement;
    yRotation =
      10 * ((e.offsetX - img.clientWidth / 2) / img.clientWidth);
    xRotation =
      -10 * ((e.offsetY - img.clientHeight / 2) / img.clientHeight);
  }

  function leaveRotate3D() {
    zoom = false;
    xRotation = 0;
    yRotation = 0;
  }
</script>

<figure class="img-container">
  <img
    src="/homer161.webp"
    alt=""
    width="425"
    height="400"
    decoding="async"
    class="img"
    class:tilt={finePointer}
    style:transform="perspective(500px) {zoom ? 'scale(1.03)' : ''} rotateX({xRotation}deg) rotateY({yRotation}deg)"
    on:mousemove={enterRotate3D}
    on:mouseleave={leaveRotate3D}
  />
  <figcaption class="caption">Homer — the unofficial mascot</figcaption>
</figure>

<style lang="scss">
  @keyframes float {
    0%,
    100% {
      transform: translateY(6px);
    }
    50% {
      transform: translateY(-6px);
    }
  }

  .img-container {
    margin: 0;
    z-index: 1;
    justify-self: end;
    animation: float 7s ease-in-out infinite;
  }

  .img {
    display: block;
    width: min(100%, 425px);
    height: auto;
    aspect-ratio: 425 / 400;
    border-radius: clamp(28px, 4vw, 48px);
    object-fit: cover;
    background-color: var(--elevation-one);
    border: 1px solid var(--elevation-four);
    transition: transform 0.35s var(--bezier-one);
  }

  .tilt {
    will-change: transform;
  }

  .caption {
    margin-top: 0.65rem;
    text-align: center;
    font-family: var(--font-two);
    font-size: 0.75rem;
    color: var(--text-secondary);
    letter-spacing: -0.03em;
  }

  @media screen and (max-width: 900px) {
    .img-container {
      justify-self: center;
      max-width: min(320px, 78vw);
    }

    .caption {
      text-align: center;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .img-container {
      animation: none;
    }

    .img {
      transition: none;
    }
  }
</style>
