<script lang="ts">
  import HeroImage from "../atoms/HeroImage.svelte";
  import Button from "../atoms/Button.svelte";
  import Socials from "../molecules/Socials.svelte";
  import { hero } from "$lib/content/site";
  import { smoothScrollTo } from "../../util/scroll";

  function scrollTo(selector: string): void {
    const el = document.querySelector(selector);
    if (!el) return;
    smoothScrollTo(el as HTMLElement);
  }

  function handleWorkClick(): void {
    scrollTo("#code");
  }

  function handleAboutClick(): void {
    scrollTo("#about");
  }

  function handleKeyPress(
    event: KeyboardEvent,
    selector: string
  ): void {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      scrollTo(selector);
    }
  }
</script>

<section id="home" class="wrapper hero" aria-labelledby="hero-heading">
  <div class="hero-content">
    <p class="eyebrow">{hero.eyebrow}</p>

    <h1 id="hero-heading">
      {hero.title}
      <span class="alias">{hero.alias}</span>
    </h1>

    <p class="lead">{hero.lead}</p>

    <ul class="signals" aria-label="Focus areas">
      {#each hero.signals as signal (signal)}
        <li>{signal}</li>
      {/each}
    </ul>

    <div class="actions">
      <Button
        side
        label={hero.ctaWork}
        on:click={handleWorkClick}
        on:keypress={(e) => handleKeyPress(e, "#code")}>{hero.ctaWork} ↓</Button
      >
      <button
        type="button"
        class="ghost"
        on:click={handleAboutClick}
        on:keypress={(e) => handleKeyPress(e, "#about")}
      >
        {hero.ctaAbout}
      </button>
    </div>

    <div class="socials" aria-label="Social links">
      <Socials />
    </div>
  </div>

  <HeroImage />
</section>

<style lang="scss">
  @use "../../styles/mixins.scss" as *;

  .hero {
    scroll-margin-top: 7rem;
    display: grid;
    grid-template-columns: minmax(0, 1.15fr) minmax(280px, 0.85fr);
    gap: clamp(2rem, 5vw, 4rem);
    align-items: center;
    margin-top: clamp(4.5rem, 10vh, 7rem);
    margin-bottom: clamp(4rem, 8vh, 6rem);
  }

  .hero-content {
    position: relative;
    max-width: 38rem;
  }

  .hero-content::before {
    @include outlineText(
      $content: "///",
      $translateX: -92%,
      $translateY: -8%,
      $fontSize: clamp(120px, 18vw, 175px),
      $letterSpacing: -0.1em,
      $opacity: 0.18
    );
  }

  .eyebrow {
    font-family: var(--font-two);
    font-size: 0.85rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 1rem;
  }

  h1 {
    font-size: clamp(3.25rem, 9vw, 5.75rem);
    line-height: 0.95;
    letter-spacing: -0.075em;
  }

  .alias {
    display: block;
    margin-top: 0.35rem;
    font-size: clamp(1.35rem, 3.2vw, 2rem);
    font-weight: 400;
    color: var(--text-secondary);
    letter-spacing: -0.04em;
  }

  .lead {
    margin-top: 1.35rem;
    max-width: 34ch;
    font-size: clamp(1.05rem, 2.2vw, 1.2rem);
    line-height: 1.65;
    color: var(--text-secondary);
  }

  .signals {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 1.5rem;
    list-style: none;
    padding: 0;

    li {
      font-family: var(--font-two);
      font-size: 0.78rem;
      letter-spacing: -0.03em;
      color: var(--accent);
      background-color: var(--elevation-one);
      border: 1px solid var(--elevation-four);
      border-radius: 7px;
      padding: 0.25rem 0.55rem;
    }
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.85rem 1rem;
    margin-top: 1.85rem;
  }

  .ghost {
    background: transparent;
    border: 1px solid var(--elevation-four);
    border-radius: 16px;
    color: var(--text-secondary);
    cursor: pointer;
    font-family: var(--font-two);
    font-size: 1rem;
    font-weight: 300;
    letter-spacing: -0.04em;
    padding: 0.95rem 1.35rem;
    transition:
      color 0.2s var(--bezier-one),
      border-color 0.2s var(--bezier-one),
      background-color 0.2s var(--bezier-one);

    &:hover {
      color: var(--text-primary);
      border-color: var(--accent-opacity);
      background-color: var(--elevation-one);
    }

    &:focus-visible {
      outline: 2px solid var(--accent);
      outline-offset: 3px;
    }
  }

  .socials {
    margin-top: 1.5rem;
  }

  @media screen and (max-width: 900px) {
    .hero {
      grid-template-columns: 1fr;
      gap: 2.25rem;
    }

    .hero-content {
      max-width: none;
    }

    .lead {
      max-width: none;
    }
  }

  @media screen and (max-width: 868px) {
    .hero {
      scroll-margin-top: 1.5rem;
      margin-top: 3.5rem;
    }

    .actions {
      flex-direction: column;
      align-items: stretch;
    }

    .ghost {
      width: 100%;
      text-align: center;
    }
  }
</style>
