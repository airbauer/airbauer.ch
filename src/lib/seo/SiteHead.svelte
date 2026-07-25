<script lang="ts">
  import { site } from "./site";
</script>

<svelte:head>
  <title>{site.title}</title>
  <meta name="description" content={site.description} />
  <link rel="canonical" href={site.url} />

  <meta property="og:type" content="website" />
  <meta property="og:site_name" content={site.name} />
  <meta property="og:title" content={site.title} />
  <meta property="og:description" content={site.description} />
  <meta property="og:url" content={site.url} />
  <meta property="og:locale" content={site.locale} />
  <meta property="og:image" content={site.ogImage} />
  <meta property="og:image:width" content={String(site.ogImageWidth)} />
  <meta property="og:image:height" content={String(site.ogImageHeight)} />
  <meta property="og:image:alt" content={site.ogImageAlt} />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content={site.twitterSite} />
  <meta name="twitter:title" content={site.title} />
  <meta name="twitter:description" content={site.description} />
  <meta name="twitter:image" content={site.ogImage} />
  <meta name="twitter:image:alt" content={site.ogImageAlt} />

  <meta
    name="theme-color"
    content={site.themeColorDark}
    media="(prefers-color-scheme: dark)"
  />
  <meta
    name="theme-color"
    content={site.themeColorLight}
    media="(prefers-color-scheme: light)"
  />

  <link rel="icon" href="/favicon.ico" sizes="any" />
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
</svelte:head>
