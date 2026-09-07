/**
 * Single source of truth for ALL site content and copy.
 *
 * Everything visitor-facing lives here — event facts, speakers, agenda, venue,
 * and every UI string (headings, labels, CTAs). Components must not hardcode
 * copy; they read from `site`. Edit values here to update the site.
 */

import fredrikPhoto from '../assets/speakers/fredrik-skogman.png';
import andreasPhoto from '../assets/speakers/andreas-heige.png';
import victorPhoto from '../assets/speakers/victor-svensson.png';
import asaPhoto from '../assets/speakers/asa-abrahamsson.png';

export interface AgendaItem {
  time: string;
  title: string;
  description: string;
  /** Optional speaker credit rendered as a link after the title. */
  speaker?: { name: string; url: string };
}

export interface Talk {
  title: string;
  description: string;
}

export interface Person {
  name: string;
  role: string;
  /** Short bio line. */
  bio?: string;
  /** Optimised portrait (processed by astro:assets). */
  photo?: ImageMetadata;
  /** Social profiles (shown as icons at the bottom of the card). */
  linkedin?: string;
  github?: string;
}

export interface Speaker extends Person {
  /** The talk this speaker (or these speakers, see `coSpeakers`) is giving. */
  talk?: Talk;
  /** Additional speaker(s) co-presenting this same talk, shown in one card. */
  coSpeakers?: Person[];
}

export const site = {
  // --- Identity ---
  name: 'GitHub Copilot DevDays',
  /** Full title as used on the Luma event page. */
  fullName: 'GitHub Copilot Dev Day: Gothenburg',
  wordmark: 'DevDays',
  tagline: 'An event for developers, hosted by Knowit Experience.',
  host: 'Knowit Experience',
  hostUrl: 'https://www.knowit.se/om-knowit/experience/',
  city: 'Gothenburg',

  // --- Key facts (from the Luma event) ---
  date: 'October 15, 2026',
  /** ISO date + times for structured data / machine reading. */
  dateISO: '2026-10-15',
  startISO: '2026-10-15T16:00:00+02:00',
  endISO: '2026-10-15T19:00:00+02:00',
  time: '16:00 – 19:00',
  price: 'Free',

  intro:
    'Spend a relaxed evening exploring how GitHub Copilot changes the way we build ' +
    'software. Three short talks — including one straight from GitHub — then drinks, food ' +
    'and great conversations. It runs for about 2–3 hours, focused on real-world ' +
    'workflows and hands-on sessions centered on Copilot. Bring your curiosity. ✨',

  // --- What to expect ---
  highlights: [
    {
      title: 'Three great talks',
      description:
        'A focused evening of three short talks — including a guest straight from GitHub — on what’s new and what actually works.',
    },
    {
      title: 'Straight from GitHub',
      description:
        'Hear directly from GitHub about where Copilot is today, where it’s heading, and how AI is reshaping the landscape.',
    },
    {
      title: 'Real-world workflows',
      description:
        'Hands-on, practical sessions centered on GitHub Copilot — the tricks, patterns and pitfalls from daily use.',
    },
    {
      title: 'Drinks, food & community',
      description:
        'Stick around for drinks, food and great conversations with developers from across the region.',
    },
  ],

  // --- Agenda (doors 15:45, talks ~45 min, mingle 18:30–19:00) ---
  agenda: [
    {
      time: '15:45',
      title: 'Doors open & mingle',
      description: 'Grab a badge, grab a drink, find a seat.',
    },
    {
      time: '16:00',
      title: 'Keynote',
      speaker: { name: 'Dennis Adolfi', url: 'https://www.linkedin.com/in/dennis-adolfi/' },
      description:
        'Our keynote speaker, Dennis Adolfi (Head of Technology at Knowit Experience), opens the evening with how GitHub Copilot has reshaped the way we work and our processes at Knowit Experience.',
    },
    {
      time: '16:15',
      title: 'Talk 1 — Taming the agentic harness',
      description:
        'Andreas Heige (Knowit Experience) on setting up agentic workflows and getting the most out of GitHub Copilot.',
    },
    {
      time: '17:00',
      title: 'Talk 2 — AI and the OWASP Top 10',
      description:
        'Victor Svensson and Åsa Abrahamsson (Knowit Experience) on securing AI through the lens of the OWASP Top 10.',
    },
    {
      time: '17:45',
      title: 'Talk 3 — New threats, new defences',
      description:
        'Fredrik Skogman (GitHub) on emerging security threats, how they’re countered, and how AI has changed the landscape.',
    },
    {
      time: '18:30',
      title: 'Mingle & networking',
      description: 'Stick around for drinks, food and great conversations.',
    },
  ] as AgendaItem[],

  // --- Speakers ---
  speakers: [
    {
      name: 'Fredrik Skogman',
      role: 'GitHub',
      photo: fredrikPhoto,
      bio: 'Supply chain security at GitHub.',
      linkedin: 'https://www.linkedin.com/in/skogman/',
      github: 'https://github.com/kommendorkapten',
      talk: {
        title: 'New threats, new defences: security in the age of AI',
        description:
          'The new security threats that have emerged, what’s been done to counter them, what’s next — and how AI has reshaped the whole landscape.',
      },
    },
    {
      name: 'Victor Svensson',
      role: 'Knowit Experience',
      photo: victorPhoto,
      bio: 'Security Architect at Knowit Experience.',
      linkedin: 'https://www.linkedin.com/in/victor-svensson-472059155/',
      coSpeakers: [
        {
          name: 'Åsa Abrahamsson',
          role: 'Knowit Experience',
          bio: 'Fullstack Developer, AI Advisor at Knowit Experience.',
          photo: asaPhoto,
          linkedin: 'https://www.linkedin.com/in/asaabrahamsson/',
        },
      ],
      talk: {
        title: 'AI and the OWASP Top 10',
        description:
          'A security lens on AI: walking the OWASP Top 10 with a focus on the risks AI introduces — and how to stay ahead of them.',
      },
    },
    {
      name: 'Andreas Heige',
      role: 'Knowit Experience',
      photo: andreasPhoto,
      bio: 'Sr. AI & Web Engineer at Knowit Experience.',
      linkedin: 'https://www.linkedin.com/in/andreasheige/',
      github: 'https://github.com/andreasheige',
      talk: {
        title: 'Taming the agentic harness',
        description:
          'How to set up and optimise an agentic workflow, with practical ways to get more out of GitHub Copilot every day.',
      },
    },
  ] as Speaker[],

  // --- Venue ---
  venue: {
    name: 'Knowit Experience Gothenburg',
    address: 'Vikingsgatan 3',
    city: '411 04 Göteborg, Sweden',
    postalCode: '411 04',
    note: 'Central location, easy to reach.',
    // Coordinates from the Luma event page.
    lat: 57.7135761,
    lng: 11.9713363,
  },

  // --- Contact & policies ---
  contact: {
    email: 'dennis.adolfi@knowit.se',
  },
  codeOfConductUrl:
    'https://github.com/github/dev-days/blob/main/EVENT_CODE_OF_CONDUCT.md',

  // --- Registration (Luma) ---
  // `slug` is the id in your public event URL, e.g. https://luma.com/mawlp9c7 -> 'mawlp9c7'.
  luma: {
    slug: 'mawlp9c7',
    publicUrl: 'https://luma.com/mawlp9c7',
  },

  // --- UI copy (headings, labels, CTAs) — keep components string-free ---
  ui: {
    nav: {
      about: 'About',
      agenda: 'Agenda',
      speakers: 'Speakers',
      venue: 'Venue',
      register: 'Register',
    },
    hero: {
      hostedByPrefix: 'Hosted by',
      titleLead: 'GitHub Copilot',
      ctaPrimary: 'Save your spot',
      ctaSecondary: 'See the agenda',
      facts: { when: 'When', time: 'Time', where: 'Where', price: 'Price' },
    },
    about: {
      eyebrow: 'What’s this all about?',
      heading: 'An informal evening of Copilot talks',
      languageNote:
        'Good to know: the talks are in Swedish, but the crowd is friendly — ask questions in English anytime.',
    },
    agenda: {
      eyebrow: 'The plan for the evening',
      heading: 'Agenda',
      lead: 'Three short talks and time to connect. Doors 15:45, talks from 16:15, mingle until 19:00. Times may shift a little.',
    },
    speakers: {
      eyebrow: 'Who you’ll hear from',
      heading: 'Speakers',
      lead: 'Four speakers — including a guest straight from GitHub.',
      talkLabel: 'Talk',
    },
    venue: {
      eyebrow: 'Getting there',
      heading: 'Venue',
      directions: 'Get directions ↗',
    },
    register: {
      eyebrow: 'Join us',
      heading: 'Register for DevDays',
      lead: 'Spots are limited and it’s free to attend. Grab yours below.',
      facadeBadge: '🎟️',
      facadeHeading: 'Reserve your spot',
      facadeBody:
        'Registration is handled securely on Luma. Load the form here, or open the full event page.',
      facadeLoad: 'Load registration form',
      facadeOpen: 'Open on Luma ↗',
      fallbackPrefix: 'Prefer the full page?',
      fallbackLink: 'Open the event on Luma ↗',
      soonHeading: 'Registration opens soon 🎟️',
      soonBody:
        'We’re putting the finishing touches on the event page. Want a heads-up the moment tickets go live? Email us at',
    },
    cta: {
      registerLabel: 'Register for DevDays',
    },
    footer: {
      hostedByPrefix: 'Hosted by',
      registerLabel: 'Register',
      backToTop: 'Back to top ↑',
      codeOfConduct: 'Code of Conduct',
      trademark:
        'Not affiliated with GitHub, Inc. “GitHub” and “Copilot” are trademarks of their respective owners.',
    },
    backToTopLabel: 'Back to top',
  },
} as const;

/** Public Luma event URL, or null if not configured. */
export function lumaUrl(): string | null {
  if (site.luma.publicUrl) return site.luma.publicUrl;
  if (site.luma.slug) return `https://luma.com/${site.luma.slug}`;
  return null;
}

/** Luma iframe embed URL for the registration form, or null if not configured. */
export function lumaEmbedUrl(): string | null {
  return site.luma.slug ? `https://luma.com/embed/event/${site.luma.slug}/simple` : null;
}

/** True when a Luma event is configured and the embed can render. */
export function lumaConfigured(): boolean {
  return site.luma.slug.length > 0;
}
