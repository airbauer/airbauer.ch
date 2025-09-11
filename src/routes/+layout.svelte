<script lang="ts">
  import { onMount } from "svelte";
  import "../styles/global.scss";
  import "../styles/fonts.scss";
  import Cursor from "../components/atoms/Cursor.svelte";
  import { dev } from "$app/environment";
  import { inject } from "@vercel/analytics";
  import { injectSpeedInsights } from "@vercel/speed-insights/sveltekit";

  // Initialize Vercel Analytics
  inject({ mode: dev ? "development" : "production" });

  // Initialize Vercel Speed Insights
  injectSpeedInsights();

  let loading = true;
  let playSFX: (() => void) | undefined;

  onMount(() => {
    // need to create our own audio context as the default Audio() pauses any music playing
    let buffer: AudioBuffer;
    const audioCtx = new window.AudioContext();
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isMuted = localStorage.getItem("sound-muted") === "true";

    fetch("/sounds/click.ogg")
      .then(res => res.arrayBuffer())
      .then(audioData => audioCtx.decodeAudioData(audioData))
      .then(decoded => {
        buffer = decoded;
        playSFX = () => {
          if (prefersReducedMotion || isMuted) return;
          if (audioCtx.state === "suspended") void audioCtx.resume();
          const source = audioCtx.createBufferSource();
          source.buffer = buffer;
          source.connect(audioCtx.destination);
          source.start(0);
        };
      })
      .catch(() => {
        // ignore audio init errors
      });

    if (document.readyState === "complete") {
      loading = false;
    }

    const classes = document.querySelector("body")?.classList;
    const stopResizeAnimation = () => {
      let resizeTimer: number | null = null;
      window.addEventListener("resize", function () {
        if (resizeTimer !== null) {
          clearTimeout(resizeTimer);
          resizeTimer = null;
        } else {
          classes?.add("stop-transitions");
        }

        resizeTimer = window.setTimeout(() => {
          classes?.remove("stop-transitions");
          resizeTimer = null;
        }, 100);
      });
    };

    stopResizeAnimation();
  });
</script>

<svelte:head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content="airbauer – Personal Website" />
  <meta
    property="og:description"
    content="Hey, ich bin airbauer – Entwickler und Gamer aus Deutschland."
  />
  <meta property="og:url" content="https://airbauer.ch" />
  <meta
    property="og:image"
    content="https://github.com/airbauer/airbauer.ch/blob/main/static/image.png?raw=true"
  />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />

  <!-- Twitter/X -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="airbauer – Personal Website" />
  <meta
    name="twitter:description"
    content="Hey, ich bin airbauer – Entwickler und Gamer aus Deutschland."
  />
  <meta
    name="twitter:image"
    content="https://github.com/airbauer/airbauer.ch/blob/main/static/image.png?raw=true"
  />
  <meta name="twitter:image:width" content="1200" />
  <meta name="twitter:image:height" content="630" />

  <!-- Other Meta Tags -->
  <meta name="theme-color" content="#CCE2F2" />
  <title>airbauer – Personal Website</title>
</svelte:head>

<svelte:window
  on:click={() => {
    playSFX?.();
  }}
/>

<Cursor />
<span class:loading>
  <slot />
</span>
