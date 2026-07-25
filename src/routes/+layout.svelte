<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import "../styles/global.scss";
  import "../styles/fonts.scss";
  import SiteHead from "$lib/seo/SiteHead.svelte";
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

<SiteHead />

<svelte:window on:click={playSFX} />

<Cursor />
<span class:loading>
  <slot />
</span>
