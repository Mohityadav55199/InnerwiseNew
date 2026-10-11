/**
 * PRIMARY NAVIGATION — labels, order and mega-menu content are taken verbatim from the
 * Figma "Desktop - Home" nav (7 items) and the "Nav / <item> / Open" frames.
 * Programs, Wellness Hub and Resources & Insights have no menu frame (and no chevron in the
 * mobile frames), so they render as plain links.
 *
 * Destinations are placeholders (see links.ts) except where the target is a section on
 * this page.
 */
import { NAV_LINKS, PLACEHOLDER } from './links';

export interface NavLink {
  label: string;
  href: string;
}

export interface MenuColumn {
  title: string;
  /** colour of the short bar above the column title */
  accent: string;
  links: NavLink[];
}

export interface MegaMenu {
  /** small uppercase label at the top of the panel */
  eyebrow: string;
  columns: MenuColumn[];
  footer: { title: string; text: string; href: string };
  /** Your Space shows the AI companion chip in the footer strip */
  companion?: { label: string; href: string };
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
  menu?: MegaMenu;
}

const ACCENT = {
  pink: '#C6368E',
  blue: '#47A3F8',
  yellow: '#FFCC03',
  plum: '#7A5495',
  green: '#345C3F',
  red: '#DE4C3F',
} as const;

/** Builds placeholder links; pass [label, href] to point one at a real target. */
const links = (...items: (string | [string, string])[]): NavLink[] =>
  items.map((item) => (typeof item === 'string' ? { label: item, href: PLACEHOLDER } : { label: item[0], href: item[1] }));

export const NAV_ITEMS: NavItem[] = [
  {
    id: 'your-space',
    label: 'Your Space',
    href: NAV_LINKS.yourSpace,
    menu: {
      eyebrow: 'Your Space',
      columns: [
        {
          title: 'What We Offer',
          accent: ACCENT.pink,
          links: links('Body & Breath Practices', 'Meditation', 'Sleep & Recovery', 'Mental Wellbeing',
            'Self-Reflection & Inner Wisdom', 'Habit & Lifestyle Support'),
        },
        {
          title: 'How We Help',
          accent: ACCENT.blue,
          links: links('Stress & Overwhelm', 'Anxiety & Worry', 'Sleep Better', 'Focus & Mental Clarity',
            'Emotional Wellbeing', 'Self-Understanding', 'Relationships & Connection', 'Healthy Habits', 'Personal Growth'),
        },
        {
          title: 'Explore Your Innerwise Journey',
          accent: ACCENT.yellow,
          links: links('Know Your Body', 'Understand Your Mind', 'Discover Your Inner Wisdom', 'Build Better Habits',
            'Connect the Whole You', ['Explore & Play', '#explore-play'], 'Self-Discovery', 'Track & Reflect'),
        },
      ],
      footer: {
        title: 'Start your Innerwise journey',
        text: 'Find a practice, explore yourself, or begin with Wisebud.',
        href: NAV_LINKS.getStarted,
      },
      companion: { label: 'Wisebud', href: '#ai-companion' },
    },
  },
  {
    id: 'organizations',
    label: 'For Organizations',
    href: NAV_LINKS.organizations,
    menu: {
      eyebrow: 'For Organisations',
      columns: [
        {
          title: 'Who We Serve',
          accent: ACCENT.plum,
          links: links('Organisations', 'Employers', 'Educational Institutions', 'Healthcare Organisations',
            'Small & Growing Businesses', 'Leaders & Teams', 'Professionals'),
        },
        {
          title: 'What We Offer',
          accent: ACCENT.blue,
          links: links('Workplace Wellbeing', 'Employee Mental Health', 'Stress & Resilience', 'Presence & Peace at Work',
            'Healthy Habits at Work', 'Leadership Wellbeing', 'Team Wellbeing', 'Mental Health Programs',
            'Wellbeing Assessments', 'Workshops & Training'),
        },
        {
          title: 'Our Approach',
          accent: ACCENT.yellow,
          links: links('The Innerwise Model', 'Body–Mind Connection', 'Inner Wisdom & Self-Awareness',
            'Habit & Behaviour Change', 'Integrated Wellbeing', 'Research', 'Personalised Wellbeing'),
        },
        {
          title: 'Organisational Resources',
          accent: ACCENT.green,
          links: links('Workplace Insights', 'Reports', 'Wellbeing Guides', 'Case Studies', 'Events & Webinars',
            'Toolkits', 'Organisation Stories'),
        },
      ],
      footer: {
        title: 'Explore workplace wellbeing',
        text: 'Support healthier people, stronger teams and whole-person wellbeing.',
        href: NAV_LINKS.organizations,
      },
    },
  },
  { id: 'programs', label: 'Programs', href: NAV_LINKS.programs },
  { id: 'wellness-hub', label: 'Wellness Hub', href: NAV_LINKS.wellnessHub },
  { id: 'resources', label: 'Resources & Insights', href: NAV_LINKS.resources },
  {
    id: 'about',
    label: 'About',
    href: NAV_LINKS.about,
    menu: {
      eyebrow: 'About Us',
      columns: [
        {
          title: 'About',
          accent: ACCENT.red,
          links: links('Our Story', 'What We Believe', 'Our Vision', 'Our Mission', 'Why Innerwise', 'Founders'),
        },
        {
          title: 'Our Framework',
          accent: ACCENT.blue,
          links: links('Body', 'Mind', 'Inner Wisdom', 'Habits', 'The Whole You', 'The Innerwise Journey'),
        },
        {
          title: 'Our Expertise',
          accent: ACCENT.yellow,
          links: links('Alternative medicine', 'Physician', 'Spiritual teachers', 'Neuroscientists', 'Psychology',
            'Wellbeing Science', 'Behaviour Change', 'Conscious Awareness', 'Digital Wellbeing', 'AI & Technology',
            'Research & Evidence'),
        },
        {
          title: 'Our Community',
          accent: ACCENT.green,
          links: links('Partnerships', 'Collaborations', 'Community Initiatives', 'Impact Stories - testimonials'),
        },
        {
          title: 'Join Innerwise',
          accent: ACCENT.pink,
          links: links('Careers', 'Become an Expert', 'Become a Partner', 'Collaborate With Us'),
        },
      ],
      footer: {
        title: 'Discover the Innerwise approach',
        text: 'Human-centred. Whole-person. Rooted in connection.',
        href: '#approach',
      },
    },
  },
  {
    id: 'help',
    label: 'Help',
    href: NAV_LINKS.help,
    menu: {
      eyebrow: 'Help',
      columns: [
        {
          title: 'Getting Started',
          accent: ACCENT.red,
          links: links('How Innerwise Works', 'Getting Started', 'Choosing Your Journey', 'Using the App'),
        },
        {
          title: 'Account & Membership',
          accent: ACCENT.blue,
          links: links('Account Management', 'Plans & Subscriptions', 'Payments & Billing', 'Manage Membership'),
        },
        {
          title: 'Using Innerwise',
          accent: ACCENT.yellow,
          links: links('App Support', 'AI Companion Support', 'Program Support', 'Tracking & Insights', 'Technical Support'),
        },
        {
          title: 'FAQs',
          accent: ACCENT.green,
          links: links(['General FAQs', '#faq'], 'Programs', 'Products', 'Wellbeing & Practices', 'Organisations'),
        },
        {
          title: 'Contact',
          accent: ACCENT.pink,
          links: links('Contact Us', 'Customer Support', 'Expert Support', 'Organisation Enquiries', 'Partnerships'),
        },
      ],
      footer: {
        title: 'Contact our support team',
        text: 'A little guidance can make your next step easier.',
        href: NAV_LINKS.help,
      },
    },
  },
];
