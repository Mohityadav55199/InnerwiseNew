import React from 'react';
import { FOOTER_LINKS } from '../../config/links';

const FOOTER_COLUMNS = [
  {
    heading: 'For You',
    links: [
      { label: 'Your Journey',   href: FOOTER_LINKS.yourJourney },
      { label: 'Body',           href: FOOTER_LINKS.body },
      { label: 'Mind',           href: FOOTER_LINKS.mind },
      { label: 'Inner Wisdom',   href: FOOTER_LINKS.innerWisdom },
      { label: 'Habits',         href: FOOTER_LINKS.habits },
      { label: 'Explore & Play', href: FOOTER_LINKS.explorePlay },
      { label: 'Library',        href: FOOTER_LINKS.library },
      { label: 'Self-Discovery', href: FOOTER_LINKS.selfDiscovery },
    ],
  },
  {
    heading: 'For Organisations',
    links: [
      { label: 'Workplace Wellbeing', href: FOOTER_LINKS.workplaceWellbeing },
      { label: 'Employee Wellbeing',  href: FOOTER_LINKS.employeeWellbeing },
      { label: 'Leadership',          href: FOOTER_LINKS.leadership },
      { label: 'Team Wellbeing',      href: FOOTER_LINKS.teamWellbeing },
      { label: 'Programs',            href: FOOTER_LINKS.programs },
      { label: 'Assessments',         href: FOOTER_LINKS.assessments },
      { label: 'Workshops',           href: FOOTER_LINKS.workshops },
    ],
  },
  {
    heading: 'Programs',
    links: [
      { label: 'Stress & Resilience',    href: FOOTER_LINKS.stressResilience },
      { label: 'Sleep & Recovery',       href: FOOTER_LINKS.sleepRecovery },
      { label: 'Emotional Wellbeing',    href: FOOTER_LINKS.emotionalWellbeing },
      { label: 'Conscious Living',       href: FOOTER_LINKS.consciousLiving },
      { label: 'Personal Growth',        href: FOOTER_LINKS.personalGrowth },
      { label: 'Digital Wellbeing',      href: FOOTER_LINKS.digitalWellbeing },
      { label: 'Healthy Habits',         href: FOOTER_LINKS.healthyHabits },
      { label: 'Integrated Wellbeing',   href: FOOTER_LINKS.integratedWellbeing },
    ],
  },
  {
    heading: 'Products',
    links: [
      { label: 'Innerwise App',          href: FOOTER_LINKS.innerwiseApp },
      { label: 'AI Companion',           href: FOOTER_LINKS.aiCompanion },
      { label: 'Assessments',            href: FOOTER_LINKS.assessments },
      { label: 'Guided Practices',       href: FOOTER_LINKS.guidedPractices },
      { label: 'Courses',                href: FOOTER_LINKS.courses },
      { label: 'Personalised Journeys',  href: FOOTER_LINKS.personalisedJourneys },
      { label: 'Tracking & Insights',    href: FOOTER_LINKS.trackingInsights },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Articles',          href: FOOTER_LINKS.articles },
      { label: 'Insights',          href: FOOTER_LINKS.insights },
      { label: 'Guides',            href: FOOTER_LINKS.guides },
      { label: 'Quizzes',           href: FOOTER_LINKS.quizzes },
      { label: 'Tiny Experiments',  href: FOOTER_LINKS.tinyExperiments },
      { label: 'Research',          href: FOOTER_LINKS.research },
      { label: 'Toolkits',          href: FOOTER_LINKS.toolkits },
      { label: 'Practices',         href: FOOTER_LINKS.practices },
    ],
  },
  {
    heading: 'About',
    links: [
      { label: 'About Innerwise', href: FOOTER_LINKS.aboutInnerwise },
      { label: 'Our Story',       href: FOOTER_LINKS.ourStory },
      { label: 'Our Framework',   href: FOOTER_LINKS.ourFramework },
      { label: 'Our Approach',    href: FOOTER_LINKS.ourApproach },
      { label: 'Our Experts',     href: FOOTER_LINKS.ourExperts },
      { label: 'Careers',         href: FOOTER_LINKS.careers },
      { label: 'Partnerships',    href: FOOTER_LINKS.partnerships },
    ],
  },
  {
    heading: 'Help',
    links: [
      { label: 'Getting Started',       href: FOOTER_LINKS.gettingStarted },
      { label: 'FAQs',                  href: FOOTER_LINKS.faqs },
      { label: 'Account & Membership',  href: FOOTER_LINKS.accountMembership },
      { label: 'App Support',           href: FOOTER_LINKS.appSupport },
      { label: 'Contact Us',            href: FOOTER_LINKS.contactUs },
    ],
  },
];

const Footer: React.FC = () => (
  <footer style={{ backgroundColor: '#2E2E2E', color: '#FFFFFF', fontFamily: 'Roboto, sans-serif', height: '600px', boxSizing: 'border-box' }}>
    <div className="footer-inner" style={{ maxWidth: '1440px', margin: '0 auto', padding: '60px 80px 0', boxSizing: 'border-box' }}>
      {/* 7-column link grid with 186px step */}
      <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 186px)', gap: '0px', justifyContent: 'space-between' }}>
        {FOOTER_COLUMNS.map((col) => (
          <div key={col.heading} style={{ paddingRight: '8px' }}>
            <p style={{ fontWeight: 600, fontSize: '18px', color: '#FAF5F2', marginBottom: '24.4px', lineHeight: '21.1px' }}>
              {col.heading}
            </p>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {col.links.map(({ label, href }) => (
                <li key={label} style={{ lineHeight: '16px' }}>
                  <a
                    href={href}
                    className="footer-link"
                    style={{ fontWeight: 400, fontSize: '14px', color: '#FFFFFF', lineHeight: '16px', display: 'inline-block' }}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Divider at +414px (height 1px, 20% white opacity) */}
      <div className="footer-divider" style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.2)', marginTop: '68.5px' }} />

      {/* Bottom row at +455px */}
      <div className="footer-bottom" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingTop: '40px' }}>
        <div>
          <p style={{ fontWeight: 700, fontSize: '28px', color: '#FFFFFF', lineHeight: 1.17, margin: 0 }}>INNERWISE</p>
          <p style={{ fontWeight: 400, fontSize: '18px', color: '#FFFFFF', lineHeight: 1.17, margin: '25.2px 0 0' }}>
            Body • Mind • Inner Wisdom • Habits
          </p>
        </div>
        <p style={{ fontWeight: 400, fontSize: '20px', color: '#FFFFFF', textAlign: 'right', lineHeight: 1.17, margin: '14px 0 0' }}>
          Understand yourself. Live better.
        </p>
      </div>
    </div>

    <style>{`
      .footer-link { transition: opacity 0.15s ease; }
      .footer-link:hover { opacity: 0.7; }
      .footer-link:focus-visible { outline: 2px solid #FE7209; outline-offset: 2px; border-radius: 2px; }
      @media (max-width: 1381px) {
        footer { height: auto !important; }
        .footer-grid { grid-template-columns: repeat(4, 1fr) !important; gap: 32px !important; }
        .footer-inner { padding: 60px 40px 40px !important; }
        .footer-divider { margin-top: 48px !important; }
      }
      @media (max-width: 768px) {
        footer { height: auto !important; }
        .footer-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 32px !important; }
        .footer-inner { padding: 40px 20px 30px !important; }
        .footer-bottom { flex-direction: column !important; align-items: flex-start !important; gap: 16px !important; }
        .footer-bottom p:last-child { text-align: left !important; margin-top: 0 !important; }
      }
      @media (max-width: 430px) {
        .footer-grid { grid-template-columns: 1fr !important; }
      }
    `}</style>
  </footer>
);

export default Footer;
