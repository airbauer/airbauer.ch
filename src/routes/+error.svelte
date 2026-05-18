<script lang="ts">
  import { page } from "$app/stores";
  import { resolve } from "$app/paths";
  $: status = $page.status;
</script>

<div class="wrapper">
  <h1>{status}</h1>
  <h4>{$page.error?.message}</h4>
  <a href={resolve("/")} class="back-link">← Zurück zur Startseite</a>
</div>

<style lang="scss">
  .wrapper {
    height: calc(100vh - 70px);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .back-link {
    margin-top: 1.5rem;
    color: var(--accent);
    font-family: var(--font-two);
    font-size: 1rem;
    text-decoration: none;
    border: 1px solid var(--accent-opacity);
    border-radius: 8px;
    padding: 0.5rem 1rem;
    transition: all 0.3s var(--bezier-one);

    &:hover {
      background-color: var(--accent);
      color: var(--elevation-one);
    }
  }
</style>
