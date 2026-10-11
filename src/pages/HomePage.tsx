import React from 'react';
import ScrollProgress from '../components/primitives/ScrollProgress';
import PlaceholderLinkNotice from '../components/primitives/PlaceholderLinkNotice';
import { useScrollReveal } from '../lib/useScrollReveal';
import { usePauseOffscreen } from '../lib/usePauseOffscreen';
import AnnouncementBar from '../components/layout/AnnouncementBar';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero/Hero';
import DiscoverSection from '../components/sections/DiscoverSection/DiscoverSection';
import FrameworkSection from '../components/sections/FrameworkSection/FrameworkSection';
import ApproachSection from '../components/sections/ApproachSection/ApproachSection';
import QuickResetSection from '../components/sections/QuickResetSection/QuickResetSection';
import AICompanionSection from '../components/sections/AICompanionSection/AICompanionSection';
import ExplorePlaySection from '../components/sections/ExplorePlaySection/ExplorePlaySection';
import ExpertsSection from '../components/sections/ExpertsSection/ExpertsSection';
import FAQSection from '../components/sections/FAQSection/FAQSection';
import FinalCTASection from '../components/sections/FinalCTASection/FinalCTASection';

const HomePage: React.FC = () => {
  useScrollReveal();
  usePauseOffscreen();
  return (
    <div className="page-bg-pattern" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <ScrollProgress />
      <PlaceholderLinkNotice />
      <a href="#main" className="skip-link">Skip to content</a>

      {/* 1. Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Navbar */}
      <Navbar />

      {/* Main Page Sections */}
      <main id="main" tabIndex={-1} style={{ outline: 'none' }}>
        {/* 3. Hero */}
        <Hero />

        {/* 4. Discover what you need today */}
        <DiscoverSection />

        {/* 5. The Innerwise Framework + Rituals banner */}
        <FrameworkSection />

        {/* 6. Our Approach */}
        <ApproachSection />

        {/* 7. Quick Reset */}
        <QuickResetSection />

        {/* 8. Innerwise AI Companion */}
        <AICompanionSection />

        {/* 9. Explore & Play */}
        <ExplorePlaySection />

        {/* 10. Meet Our Experts (Figma rev. 2) */}
        <ExpertsSection />

        {/* 11. FAQ */}
        <FAQSection />

        {/* 12. Final CTA */}
        <FinalCTASection />
      </main>

      {/* 13. Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
