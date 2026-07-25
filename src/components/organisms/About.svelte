<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import RichPresence from "../molecules/RichPresence.svelte";
  import Tooltip from "../atoms/Tooltip.svelte";
  import { about } from "$lib/content/site";

  function getAge(): string {
    const birthDate = new Date("2007/11/24");
    const ageMs = Date.now() - birthDate.getTime();
    return (ageMs / 31536000000).toFixed(10);
  }

  let age = getAge();
  let ageInterval: ReturnType<typeof setInterval>;

  onMount(() => {
    ageInterval = setInterval(() => {
      age = getAge();
    }, 1000);
  });

  onDestroy(() => {
    if (ageInterval) {
      clearInterval(ageInterval);
    }
  });
</script>

<section
  id="about"
  class="wrapper about"
  aria-labelledby="about-heading"
>
  <div class="activity">
    <RichPresence heading={about.activityHeading} />
  </div>

  <article class="bio">
    <h2 id="about-heading">{about.title}</h2>
    <p class="intro">{about.intro}</p>
    <p>
      I'm a <Tooltip tip={age}><span>{Math.floor(Number(age))}</span></Tooltip>
      year-old developer from Germany. I've been writing code seriously since
      <span>{about.programmingSince}</span>, running Linux since
      <span>{about.linuxSince}</span>, and slowly shifting most of my workflow toward
      FOSS. I contribute on
      <Tooltip tip={about.links.forgejo.tip}>
        <a
          href={about.links.forgejo.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>{about.links.forgejo.label}</span>
        </a>
      </Tooltip>
      first —
      <Tooltip tip={about.links.github.tip}>
        <a
          href={about.links.github.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>{about.links.github.label}</span>
        </a>
      </Tooltip>
      is the fallback when upstream lives there.
    </p>
  </article>
</section>

<style lang="scss">
  @use "../../styles/mixins.scss" as *;

  .about {
    margin-bottom: clamp(4.5rem, 8vh, 6rem);
    display: grid;
    gap: clamp(2.5rem, 5vw, 4.5rem);
    grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
    align-items: start;
  }

  .bio {
    position: relative;
  }

  .bio::before {
    @include outlineText(
      $content: "vik",
      $translateX: 88%,
      $translateY: -2%,
      $fontSize: clamp(180px, 28vw, 300px),
      $opacity: 0.16
    );
  }

  h2 {
    margin-bottom: 0.85rem;
    font-size: clamp(1.75rem, 4vw, 2.25rem);
  }

  .intro {
    margin-bottom: 1rem;
    font-size: clamp(1.05rem, 2vw, 1.15rem);
    line-height: 1.65;
    color: var(--text-primary);
    font-weight: 400;
  }

  .bio p:last-child {
    line-height: 1.75;
  }

  .bio span {
    font-weight: 400;
    font-family: var(--font-two);
    font-size: 0.9rem;
    background-color: var(--elevation-one);
    border-radius: 7px;
    color: var(--accent);
    padding: 0.2rem 0.5rem;
    width: fit-content;
  }

  .bio a {
    text-decoration: none;
  }

  @media (max-width: 868px) {
    .about {
      grid-template-columns: 1fr;
    }

    .bio::before {
      opacity: 0.1;
    }
  }
</style>
