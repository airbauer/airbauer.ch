<script>
  import Social from "../atoms/Social.svelte";
  import { user } from "../../util/discord";

  import { GitHubIcon } from "@indaco/svelte-iconoir/github";
  import { DiscordIcon } from "@indaco/svelte-iconoir/discord";
  import { MailIcon } from "@indaco/svelte-iconoir/mail";
  import { CoffeeCupIcon } from "@indaco/svelte-iconoir/coffee-cup";
  import { KeyIcon } from "@indaco/svelte-iconoir/key";
</script>

<div class="socials-container">
  <Social tip="airbauer" link="https://github.com/airbauer">
    <GitHubIcon color="var(--accent)" />
  </Social>

  <Social tip={user.username} link={`https://discord.com/users/${user.id}`}>
    <DiscordIcon color="var(--accent)" />
  </Social>

  <Social tip="airbauer@proton.me" link="mailto:airbauer@proton.me">
    <MailIcon color="var(--accent)" />
  </Social>

  <Social tip="airbauer" link="https://ko-fi.com/airbauer">
    <CoffeeCupIcon color="var(--accent)" />
  </Social>

  <Social
    tip="PGP"
    link="https://keyoxide.org/hkp/cdc2eef0d57acee83aa686f2dd90f5053a5dca4c"
  >
    <KeyIcon color="var(--accent)" />
  </Social>
</div>

<style>
  .socials-container {
    display: flex;
    gap: 0.75rem;
  }
</style>
