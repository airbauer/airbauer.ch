<script>
  import Tooltip from "../atoms/Tooltip.svelte";
  import Socials from "./Socials.svelte";
</script>

<hr />
<footer class="wrapper">
  <Socials />
  <a href="https://icp.gov.moe/?keyword=20247968" target="_blank">
    <img src="/icon400.png" class="footer-image" alt="ICP备案图标" />
    萌ICP备20247968号
  </a>
  <h6>
    Made with pain. &#60;3
    <Tooltip tip="you're here"><span>V2</span></Tooltip>
    <Tooltip tip="how to delete">
      <a href="https://old.airbauer.ch/" target="_blank" rel="noreferrer">V1</a>
    </Tooltip>
  </h6>
</footer>

<style lang="scss">
  hr {
    background-color: var(--elevation-one);
    height: 1px;
    border: 0;
    width: 100%;
    margin-bottom: 2rem;

    @media screen and (max-width: 768px) {
      margin-bottom: 1.5rem;
    }
  }

  footer {
    padding-bottom: 2.4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media screen and (max-width: 768px) {
      flex-direction: column;
    }
  }

  a {
    transition: 0.3s var(--bezier-one);
    font-family: var(--font-two);
    text-decoration: none;
    color: var(--text-secondary);
    font-size: 0.9rem;
    border-radius: 7px;
    padding: 0.15rem 0.5rem 0.15rem;
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;

    &:hover {
      font-weight: 400;
      background-color: var(--accent);
      color: var(--elevation-one);
      border-radius: 7px;
      width: fit-content;
    }
  }

  .footer-image {
    height: 1.5em;
    width: auto;
    vertical-align: middle;
    margin-right: 0.3em;
  }

  h6 {
    text-align: center;
    line-height: 2.5rem;
    margin-top: 0;
  }

  span {
    font-family: var(--font-two);
    background-color: var(--elevation-one);
    border-radius: 7px;
    padding: 0.15rem 0.5rem 0.15rem;
    width: fit-content;
    margin-left: 1rem;
    margin-right: 0.4rem;
  }
</style>
