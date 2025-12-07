<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import Tooltip from "../atoms/Tooltip.svelte";

  import { user } from "../../util/discord";
  import type { Spotify } from "../../util/types";

  let activity = `@${user.username}`,
    details = "Fetching...",
    activityImage = "hellsing.gif",
    pulse = 30000,
    activityNumber = 0,
    state: string,
    smallImage: string,
    isSpotify: boolean,
    isActivity: boolean,
    songLink: string,
    progress: number,
    elapsed: string,
    spotifyTotal: number,
    currentSetInterval: ReturnType<typeof setInterval> | null = null,
    currentRequestAnimationFrame: number | null = null,
    heartbeatInterval: ReturnType<typeof setInterval> | null = null,
    reconnectTimeout: ReturnType<typeof setTimeout> | null = null;
  let lanyard: WebSocket | null = null;

  const images: { [key: string]: string } = {
    "CLIP STUDIO PAINT": "https://i.imgur.com/IUVs3RB.png",
  };

  function localTime() {
    state = new Date().toLocaleTimeString("de-DE", {
      timeZone: "Europe/Berlin",
    });
  }

  function musicProgress(spotify: Spotify) {
    spotifyTotal = spotify.timestamps.end - spotify.timestamps.start;
    progress =
      100 -
      (100 * (spotify.timestamps.end - new Date().getTime())) / spotifyTotal;
  }

  function elapsedTime(timestampStart: number) {
    const elapsedMs = new Date().getTime() - timestampStart;
    elapsed = new Date(elapsedMs).toISOString().slice(11, 19) + " elapsed";
    if (elapsed.slice(0, 2) === "00") {
      elapsed = elapsed.slice(-13);
    }
  }

  function cleanup() {
    if (currentSetInterval) {
      clearInterval(currentSetInterval);
      currentSetInterval = null;
    }
    if (currentRequestAnimationFrame !== null) {
      cancelAnimationFrame(currentRequestAnimationFrame);
      currentRequestAnimationFrame = null;
    }
    if (heartbeatInterval) {
      clearInterval(heartbeatInterval);
      heartbeatInterval = null;
    }
    if (reconnectTimeout) {
      clearTimeout(reconnectTimeout);
      reconnectTimeout = null;
    }
    if (lanyard) {
      lanyard.close();
      lanyard = null;
    }
  }

  onMount(() => {
    // Initialize clock before connecting to Lanyard
    localTime();
    currentSetInterval = setInterval(() => localTime(), 1000);

    function connect() {
      if (currentSetInterval) {
        clearInterval(currentSetInterval);
        currentSetInterval = null;
      }
      lanyard = new WebSocket("wss://api.lanyard.rest/socket");
      lanyard.onopen = () => console.log("Synced with Discord rich presence!");

      lanyard.onmessage = (e) => {
        const json = JSON.parse(e.data);
        const opcode = json.op;
        const data = json.d;

        if (opcode === 1) {
          pulse = data.heartbeat_interval;
          lanyard?.send(
            JSON.stringify({
              op: 2,
              d: { subscribe_to_id: user.id },
            })
          );
        }

        // requestAnimationFrame is much more performant than setTimeout
        function tick() {
          if (!lanyard) return;
          if (isSpotify && data.spotify) musicProgress(data.spotify);
          else if (isActivity && data.activities?.[activityNumber]?.timestamps?.start)
            elapsedTime(data.activities[activityNumber].timestamps.start);
          else if (!isActivity) localTime();
          currentRequestAnimationFrame = requestAnimationFrame(tick);
        }

        // keep the websocket connection alive
        if (heartbeatInterval) {
          clearInterval(heartbeatInterval);
        }
        heartbeatInterval = setInterval(() => {
          if (lanyard && lanyard.readyState === WebSocket.OPEN) {
            lanyard.send(JSON.stringify({ op: 3 }));
          }
        }, pulse);

        if (opcode === 0) {
          isSpotify = data.listening_to_spotify;
          isActivity = !!data.activities?.[0];

          if (isSpotify && data.spotify) {
            ({
              song: activity,
              artist: details,
              album: state,
              album_art_url: activityImage,
            } = data.spotify);

            details = "by " + details.replace(/;/g, ",");
            state = activity === state ? "" : "on " + state; // check if the song is a single
            songLink = `https://open.spotify.com/track/${data.spotify.track_id}`;
            smallImage = "";
            if (currentRequestAnimationFrame !== null) {
              cancelAnimationFrame(currentRequestAnimationFrame);
            }
            tick();
          } else if (isActivity && data.activities?.[activityNumber]) {
            ({
              name: activity,
              details,
              state,
            } = data.activities[activityNumber]);
            activityImage = data.activities[activityNumber].assets
              ? `https://cdn.discordapp.com/app-assets/${data.activities[activityNumber].application_id}/${data.activities[activityNumber].assets.large_image}.webp?size=512`
              : images[activity] || "question_mark.png";
            smallImage = "";
            if (
              data.activities[activityNumber].assets &&
              data.activities[activityNumber].assets.small_image
            ) {
              smallImage = `https://cdn.discordapp.com/app-assets/${data.activities[activityNumber].application_id}/${data.activities[activityNumber].assets.small_image}.webp?size=512`;
            }
            if (currentRequestAnimationFrame !== null) {
              cancelAnimationFrame(currentRequestAnimationFrame);
            }
            tick();
          } else if (!isActivity) {
            activity = `@${user.username}`;
            details =
              data.discord_status.charAt(0).toUpperCase() +
              data.discord_status.slice(1);
            details = details === "Dnd" ? "Do Not Disturb" : details;
            activityImage = "hellsing.gif";
            smallImage = "";
            if (currentRequestAnimationFrame !== null) {
              cancelAnimationFrame(currentRequestAnimationFrame);
            }
            tick();
          }
        }
      };

      // re-open websocket connection when it closes, e.g. when switched out of tab
      lanyard.onclose = () => {
        if (lanyard) {
          lanyard.close();
          lanyard = null;
        }
        reconnectTimeout = setTimeout(() => connect(), 2500);
      };

      lanyard.onerror = () => {
        if (lanyard) {
          lanyard.close();
          lanyard = null;
        }
        reconnectTimeout = setTimeout(() => connect(), 2500);
      };
    }
    connect();
  });

  onDestroy(() => {
    cleanup();
  });
</script>

<h2>activity</h2>
<div class="contain">
  <img
    src={activityImage}
    alt={`${activity} - ${details || ""}`}
    class="big"
    class:spin={isSpotify}
    loading="lazy"
  />
  {#if smallImage}
    <img src={smallImage} alt="" class="small" aria-hidden="true" loading="lazy" />
  {/if}
  <div>
    {#if isSpotify}
      <a href={songLink} target="_blank" rel="noopener noreferrer">
        <Tooltip tip="Open Spotify">
          <h3>{activity}</h3>
        </Tooltip>
      </a>
    {:else}
      <h3>{activity}</h3>
    {/if}
    <h5>{details || ""}</h5>
    <h5>{state || ""}</h5>
    {#if isSpotify}
      <progress max="100" value={progress}></progress>
    {:else if isActivity}
      <h5>{elapsed}</h5>
    {/if}
  </div>
</div>

<style lang="scss">
  .contain {
    display: flex;
    gap: 2.25rem;
    align-items: center;
  }

  a,
  a:not(:hover) {
    border-radius: 4px;
    text-decoration: underline;
    text-decoration-color: var(--bg-color);
    transition: 0.3s var(--bezier-one);
  }

  h2 {
    display: none;
  }

  a:hover {
    text-decoration-color: var(--text-primary);
  }

  .big {
    height: 135px;
    width: 135px;
    border-radius: 20px;
    display: relative;
    user-select: none;
    transition: all 0.3s var(--bezier-one);
  }

  .small {
    height: 40px;
    width: 40px;
    border-radius: 50%;
    position: absolute;
    transform: translate(275%, 150%);
    outline: 6px solid var(--bg-color);
    background-color: var(--bg-color);
  }

  progress {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: 0;
    border-radius: 10rem;
    margin: 0;
    margin-top: 0.6rem;
    background-color: var(--elevation-one);
    height: 0.6rem;
    overflow: hidden;

    &::-webkit-progress-bar {
      background-color: var(--elevation-one);
      border-radius: 10rem;
    }

    // dont ask me why these have to be duplicated because idk either
    &[value]::-webkit-progress-value {
      background-color: var(--accent);
      border-radius: 10rem;
    }

    &[value]::-moz-progress-bar {
      background-color: var(--accent);
      border-radius: 10rem;
    }
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .spin {
    animation: rotate 40s linear infinite;
    border-radius: 50%;
  }

  @media screen and (max-width: 868px) {
    h2 {
      display: block;
      margin-bottom: 1rem;
    }
    div {
      justify-content: left;
    }

    .big {
      height: 100px;
      width: 100px;
      border-radius: 17px;
    }

    .spin {
      border-radius: 50%;
    }

    .small {
      transform: translate(190%, 110%);
    }
  }
</style>
