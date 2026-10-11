/**
 * FOOTER CONTENT — link groups and brand copy for the site footer.
 * Groups and labels are the Figma footer's; order puts For You · For Organisations ·
 * Programs · Resources on the first desktop row. Destinations come from links.ts.
 * The footer component renders whatever this file contains.
 */
import { FOOTER_LINKS as L } from './links';

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterGroup {
  heading: string;
  links: FooterLink[];
}

export const FOOTER_GROUPS: FooterGroup[] = [
  {
    heading: 'For You',
    links: [
      { label: 'Your Journey', href: L.yourJourney },
      { label: 'Body', href: L.body },
      { label: 'Mind', href: L.mind },
      { label: 'Inner Wisdom', href: L.innerWisdom },
      { label: 'Habits', href: L.habits },
      { label: 'Explore & Play', href: L.explorePlay },
      { label: 'Library', href: L.library },
      { label: 'Self-Discovery', href: L.selfDiscovery },
    ],
  },
  {
    heading: 'For Organisations',
    links: [
      { label: 'Workplace Wellbeing', href: L.workplaceWellbeing },
      { label: 'Employee Wellbeing', href: L.employeeWellbeing },
      { label: 'Leadership', href: L.leadership },
      { label: 'Team Wellbeing', href: L.teamWellbeing },
      { label: 'Programs', href: L.programs },
      { label: 'Assessments', href: L.assessments },
      { label: 'Workshops', href: L.workshops },
    ],
  },
  {
    heading: 'Programs',
    links: [
      { label: 'Stress & Resilience', href: L.stressResilience },
      { label: 'Sleep & Recovery', href: L.sleepRecovery },
      { label: 'Emotional Wellbeing', href: L.emotionalWellbeing },
      { label: 'Conscious Living', href: L.consciousLiving },
      { label: 'Personal Growth', href: L.personalGrowth },
      { label: 'Digital Wellbeing', href: L.digitalWellbeing },
      { label: 'Healthy Habits', href: L.healthyHabits },
      { label: 'Integrated Wellbeing', href: L.integratedWellbeing },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Articles', href: L.articles },
      { label: 'Insights', href: L.insights },
      { label: 'Guides', href: L.guides },
      { label: 'Quizzes', href: L.quizzes },
      { label: 'Tiny Experiments', href: L.tinyExperiments },
      { label: 'Research', href: L.research },
      { label: 'Toolkits', href: L.toolkits },
      { label: 'Practices', href: L.practices },
    ],
  },
  {
    heading: 'Products',
    links: [
      { label: 'Innerwise App', href: L.innerwiseApp },
      { label: 'AI Companion', href: L.aiCompanion },
      { label: 'Assessments', href: L.assessments },
      { label: 'Guided Practices', href: L.guidedPractices },
      { label: 'Courses', href: L.courses },
      { label: 'Personalised Journeys', href: L.personalisedJourneys },
      { label: 'Tracking & Insights', href: L.trackingInsights },
    ],
  },
  {
    heading: 'About',
    links: [
      { label: 'About Innerwise', href: L.aboutInnerwise },
      { label: 'Our Story', href: L.ourStory },
      { label: 'Our Framework', href: L.ourFramework },
      { label: 'Our Approach', href: L.ourApproach },
      { label: 'Our Experts', href: L.ourExperts },
      { label: 'Careers', href: L.careers },
      { label: 'Partnerships', href: L.partnerships },
    ],
  },
  {
    heading: 'Help',
    links: [
      { label: 'Getting Started', href: L.gettingStarted },
      { label: 'FAQs', href: L.faqs },
      { label: 'Account & Membership', href: L.accountMembership },
      { label: 'App Support', href: L.appSupport },
      { label: 'Contact Us', href: L.contactUs },
    ],
  },
];

/** Brand column — existing site copy only (Figma footer taglines + the AI Companion care note). */
export const FOOTER_BRAND = {
  pillars: 'Body • Mind • Inner Wisdom • Habits',
  tagline: 'Understand yourself. Live better.',
  careNote: 'AI support is designed to complement — not replace — professional care.',
};
