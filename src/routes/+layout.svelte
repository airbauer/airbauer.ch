<script lang="ts">
  import { onMount, onDestroy } from "svelte";
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
  let resizeTimer: ReturnType<typeof setTimeout> | null = null;
  let handleResize: (() => void) | null = null;

  onMount(() => {
    // need to create our own audio context as the default Audio() pauses any music playing
    let buffer: AudioBuffer | null = null;
    const audioCtx = new window.AudioContext();
    const request = new XMLHttpRequest();
    request.open("GET", "sounds/click.ogg", true);
    request.responseType = "arraybuffer";
    request.onload = function () {
      const audioData: ArrayBuffer = request.response;
      audioCtx.decodeAudioData(
        audioData,
        function (decodedBuffer) {
          buffer = decodedBuffer;
          playSFX = () => {
            if (!buffer) return;
            const source = audioCtx.createBufferSource();
            source.buffer = buffer;
            source.connect(audioCtx.destination);
            source.start(0);
          };
        },
        function (error) {
          console.error("Error decoding audio data:", error);
        }
      );
    };
    request.onerror = function () {
      console.error("Error loading audio file");
    };
    request.send();

    if (document.readyState === "complete") {
      loading = false;
    }

    const classes = document.querySelector("body")?.classList;

    handleResize = () => {
      if (resizeTimer) {
        clearTimeout(resizeTimer);
        resizeTimer = null;
      } else {
        classes?.add("stop-transitions");
      }

      resizeTimer = setTimeout(() => {
        classes?.remove("stop-transitions");
        resizeTimer = null;
      }, 100);
    };

    window.addEventListener("resize", handleResize);
  });

  onDestroy(() => {
    if (handleResize) {
      window.removeEventListener("resize", handleResize);
    }
    if (resizeTimer) {
      clearTimeout(resizeTimer);
    }
  });
</script>

<svelte:head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Vik's Personal Website" />
  <meta
    property="og:description"
    content="Hey there, I'm Vik! :] I'm a 17 year old programmer and gamer based in Germany 🇩🇪. I've taken programming seriously since 2019, and have been doodling around with linux since 2022. Recently, however, I've grown a knack for FOSS/FLOSS."
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
  <meta name="twitter:title" content="Vik's Personal Website" />
  <meta
    name="twitter:description"
    content="Hey there, I'm Vik! :] I'm a 17 year old programmer and gamer based in Germany 🇩🇪. I've taken programming seriously since 2019, and have been doodling around with linux since 2022. Recently, however, I've grown a knack for FOSS/FLOSS."
  />
  <meta
    name="twitter:image"
    content="https://github.com/airbauer/airbauer.ch/blob/main/static/image.png?raw=true"
  />
  <meta name="twitter:image:width" content="1200" />
  <meta name="twitter:image:height" content="630" />

  <!-- Other Meta Tags -->
  <meta name="theme-color" content="#CCE2F2" />
  <title>Vik's Personal Website</title>
</svelte:head>

<svelte:window on:click={playSFX} />

<Cursor />
<span class:loading>
  <slot />
</span>
