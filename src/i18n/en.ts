import type { Dictionary } from "./dictionary";

export const en: Dictionary = {
  meta: {
    title: "Chuchube | Spot a fake? Chuchube!",
    description:
      "Seen a page impersonating a well-known person or business? Upload a screenshot or paste a link: Chuchube tells you how likely it is fake and why, points you to the official channel, and lets you block and report it right away.",
    siteName: "Chuchube",
  },
  nav: {
    skipToContent: "Skip to main content",
    home: "Chuchube, back to top",
    languages: "Choose language",
    contact: "Businesses: get in touch",
  },
  hero: {
    titleLead: "Spot a fake?",
    titleCry: "Chuchube!",
    problem:
      "Every week, new fake fanpages impersonating well-known people pop up, luring followers into gambling and investment scams.",
    answer:
      "Chuchube checks a suspicious page in seconds, points you to the official channel, and lets you block and report it on the spot.",
    cryMeaning:
      "“Chuchube!” means: you spotted a fake, so block and report it right away. It is also the name of the main button in the app.",
    primaryCta: "Businesses: get in touch",
    secondaryCta: "See how it works",
  },
  evidence: {
    label: "Illustration",
    caption: "Illustration: a fake page and the official one. Names and pages are fictional.",
    official: {
      initial: "M",
      name: "Bếp của Mơ",
      status: "Verified official channel",
      followers: "1.2M followers",
      since: "Active since 2016",
    },
    fake: {
      initial: "M",
      name: "Bếp của Mơ - Tri Ân",
      status: "Suspicious page",
      followers: "2,318 followers",
      since: "Created 6 days ago",
      post: "Invest with Mơ, 30% profit every week. Message now to save your spot!",
      verdictValue: "92%",
      verdictLabel: "likely fake",
    },
    stamp: "Chuchube!",
  },
  howItWorks: {
    title: "How it works",
    intro: "Three steps, from spotting a strange page to reporting it.",
    steps: {
      check: {
        title: "Check",
        body: "Upload a screenshot or paste a link to the suspicious page. AI tells you how likely it is to be fake, as a percentage, and why.",
      },
      compare: {
        title: "Compare",
        body: "Chuchube compares it against a directory of verified official channels and points you to the real one.",
      },
      report: {
        title: "Chuchube!",
        body: "Block and report it right away, with an evidence pack ready to send to the platform.",
      },
    },
    video: {
      label: "Illustration",
      description:
        "Illustration video: a screenshot of a suspicious page is checked, comes back 92% likely fake with three reasons, the official channel appears, and the Chuchube! button blocks and reports the page.",
      pause: "Pause the illustration video",
      play: "Play the illustration video",
    },
  },
  audiences: {
    title: "One app, two promises",
    users: {
      name: "For users",
      promise: "Know which page is real before you follow, message or send money.",
      detail:
        "A screenshot is enough. You get a percentage, the reasons behind it, and a link to the official channel.",
    },
    businesses: {
      name: "For businesses and public figures",
      promise: "Your fans spot the fakes, and you get the evidence to have them taken down.",
      detail:
        "Register and verify your official channels. Chuchube tracks fake pages, groups your fans' reports and packages the evidence for you to send to the platform.",
    },
  },
  privacy: {
    title: "Security and privacy",
    intro: "You hand us a screenshot. Here is what happens to it.",
    points: {
      screenshots: {
        title: "Screenshots are used only for the check",
        body: "Your screenshot is analyzed by an AI service to produce the result. Chuchube does not keep it.",
      },
      noSale: {
        title: "We don't sell data",
        body: "We do not sell your data.",
      },
      site: {
        title: "This website doesn't track you",
        body: "No analytics, no third-party code and no forms collecting your details.",
      },
    },
  },
  contact: {
    title: "Are you a business or a public figure?",
    body: "Register your official channels so your fans and customers always find the real page. Email us to get started.",
    cta: "Businesses: get in touch",
    emailLead: "Or write directly to",
  },
  footer: {
    cry: "Spot a fake? Chuchube!",
    note: "All names, pages and illustrations on this site are fictional.",
    copyright: "© 2026 Chuchube",
  },
  notFound: {
    title: "This page doesn't exist",
    back: "Back to the home page",
  },
};
