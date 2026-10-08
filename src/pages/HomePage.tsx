import React from 'react';
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
import FAQSection from '../components/sections/FAQSection/FAQSection';
import FinalCTASection from '../components/sections/FinalCTASection/FinalCTASection';

const HomePage: React.FC = () => {
  return (
    <div className="page-bg-pattern" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* 1. Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Navbar */}
      <Navbar />

      {/* Main Page Sections */}
      <main>
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

        {/* 10. FAQ */}
        <FAQSection />

        {/* 11. Final CTA */}
        <FinalCTASection />
      </main>

      {/* 12. Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
