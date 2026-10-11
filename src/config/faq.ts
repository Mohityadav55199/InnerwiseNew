/**
 * FAQ CONTENT — the single source for every FAQ on the site.
 * Local, static data (there is no CMS or API). Questions and answers are the approved
 * copy from the Figma "Desktop - Home" frame; add, remove or reorder entries here —
 * the FAQ section renders whatever this list contains.
 */
import { FOOTER_LINKS } from './links';

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'getting-started' | 'care';
  /** ascending display order */
  order: number;
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'what-is-innerwise',
    question: 'What is Innerwise?',
    answer: 'Innerwise is a whole-person wellbeing platform that brings together Body, Mind, Inner Wisdom and Habits to help people understand themselves and build healthier ways of living.',
    category: 'general',
    order: 1,
  },
  {
    id: 'four-pillars',
    question: 'What are the four Innerwise pillars?',
    answer: 'Body, Mind, Inner Wisdom and Habits. Together, they provide a broader view of everyday wellbeing.',
    category: 'general',
    order: 2,
  },
  {
    id: 'who-is-it-for',
    question: 'Who is Innerwise for?',
    answer: 'Innerwise is designed for individuals as well as organisations looking to support wellbeing.',
    category: 'general',
    order: 3,
  },
  {
    id: 'what-can-i-explore',
    question: 'What can I explore on Innerwise?',
    answer: 'You can explore guided practices, Programs, self-discovery tools, articles, quizzes, reflections, habit tools and personalised wellbeing experiences.',
    category: 'getting-started',
    order: 4,
  },
  {
    id: 'professional-care',
    question: 'Does Innerwise provide professional mental health care?',
    answer: 'Innerwise can provide wellbeing education, tools and support. Where professional mental health care is needed, appropriate qualified professionals and services should be sought.',
    category: 'care',
    order: 5,
  },
  {
    id: 'how-do-i-start',
    question: 'How do I start?',
    answer: 'Simply begin with what you need today — or take the Innerwise journey to explore yourself more broadly.',
    category: 'getting-started',
    order: 6,
  },
];

/** How many questions the home page lists before offering "See all N questions". */
export const FAQ_HOME_LIMIT = 6;

/** "Still have a question?" panel under the list */
export const FAQ_HELP = {
  title: 'Still have a question?',
  link: { label: 'Contact our support team', href: FOOTER_LINKS.contactUs },
};
