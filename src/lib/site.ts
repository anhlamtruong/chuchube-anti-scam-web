export const siteUrl = "https://chuchube.co";

export const contactEmail = "hello@chuchube.co";

export const contactHref = `mailto:${contactEmail}`;

/** Section anchors are shared by both locales so links stay stable. */
export const sectionIds = {
  main: "main",
  howItWorks: "how-it-works",
  audiences: "for-you",
  privacy: "privacy",
  contact: "contact",
} satisfies Record<string, string>;
