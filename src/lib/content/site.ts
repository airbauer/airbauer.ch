export const hero = {
  eyebrow: "Developer · Germany",
  title: "AIRbauer",
  alias: "aka Vik",
  lead:
    "I build for the web, break Linux configs on purpose, and push to FOSS repos when I can. Games are the cooldown timer.",
  signals: ["Web", "Linux", "FOSS", "Gaming"] as const,
  ctaWork: "See my work",
  ctaAbout: "About me",
} as const;

export const about = {
  title: "About",
  activityHeading: "Right now",
  intro:
    "Programmer and gamer from Germany — curious about systems, skeptical of bloat, and still learning faster than I ship.",
  programmingSince: "2019",
  linuxSince: "2022",
  links: {
    forgejo: {
      href: "https://codeberg.org/airbauer",
      label: "Codeberg",
      tip: "Preferred forge",
    },
    github: {
      href: "https://github.com/airbauer",
      label: "GitHub",
      tip: "When upstream lives here",
    },
  },
} as const;
