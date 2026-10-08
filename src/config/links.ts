/**
 * NAVIGATION LINKS — All link destinations centralized here.
 * Every href in the codebase must reference this file.
 * Use PLACEHOLDER for destinations not yet specified by the client.
 * Do NOT scatter href="#" or invent real URLs throughout components.
 *
 * Per INNERWISE_FIGMA_IMPLEMENTATION_SPEC.md §16 Q7:
 * Link targets are NOT SPECIFIED. Placeholders used until confirmed.
 */

/** Placeholder for all unspecified link destinations */
export const PLACEHOLDER = '#' as const;

export const NAV_LINKS = {
  home:        PLACEHOLDER,
  yourSpace:   PLACEHOLDER,
  organizations: PLACEHOLDER,
  programs:    PLACEHOLDER,
  wellnessHub: PLACEHOLDER,
  about:       PLACEHOLDER,
  help:        PLACEHOLDER,
  signIn:      PLACEHOLDER,
  getStarted:  PLACEHOLDER,
} as const;

export const HERO_LINKS = {
  beginJourney:    PLACEHOLDER,
  exploreInnerwise: PLACEHOLDER,
} as const;

export const DISCOVER_LINKS = {
  feelCalmer:       PLACEHOLDER,
  sleepBetter:      PLACEHOLDER,
  understandMyself: PLACEHOLDER,
  buildHabits:      PLACEHOLDER,
  feelConnected:    PLACEHOLDER,
  growThroughChange: PLACEHOLDER,
} as const;

export const FRAMEWORK_LINKS = {
  exploreMind:  PLACEHOLDER,
  exploreBody:  PLACEHOLDER,
  exploreHabits: PLACEHOLDER,
} as const;

export const APPROACH_LINKS = {
  discoverApproach: PLACEHOLDER,
} as const;

export const QUICKRESET_LINKS = {
  tryQuickReset: PLACEHOLDER,
} as const;

export const AI_LINKS = {
  meetCompanion: PLACEHOLDER,
} as const;

export const EXPLORE_LINKS = {
  explorePlay: PLACEHOLDER,
} as const;

export const CTA_LINKS = {
  startJourney: PLACEHOLDER,
} as const;

export const FOOTER_LINKS = {
  // For You
  yourJourney:    PLACEHOLDER,
  body:           PLACEHOLDER,
  mind:           PLACEHOLDER,
  innerWisdom:    PLACEHOLDER,
  habits:         PLACEHOLDER,
  explorePlay:    PLACEHOLDER,
  library:        PLACEHOLDER,
  selfDiscovery:  PLACEHOLDER,
  // For Organisations
  workplaceWellbeing: PLACEHOLDER,
  employeeWellbeing:  PLACEHOLDER,
  leadership:         PLACEHOLDER,
  teamWellbeing:      PLACEHOLDER,
  programs:           PLACEHOLDER,
  assessments:        PLACEHOLDER,
  workshops:          PLACEHOLDER,
  // Programs
  stressResilience:    PLACEHOLDER,
  sleepRecovery:       PLACEHOLDER,
  emotionalWellbeing:  PLACEHOLDER,
  consciousLiving:     PLACEHOLDER,
  personalGrowth:      PLACEHOLDER,
  digitalWellbeing:    PLACEHOLDER,
  healthyHabits:       PLACEHOLDER,
  integratedWellbeing: PLACEHOLDER,
  // Products
  innerwiseApp:        PLACEHOLDER,
  aiCompanion:         PLACEHOLDER,
  guidedPractices:     PLACEHOLDER,
  courses:             PLACEHOLDER,
  personalisedJourneys: PLACEHOLDER,
  trackingInsights:    PLACEHOLDER,
  // Resources
  articles:     PLACEHOLDER,
  insights:     PLACEHOLDER,
  guides:       PLACEHOLDER,
  quizzes:      PLACEHOLDER,
  tinyExperiments: PLACEHOLDER,
  research:     PLACEHOLDER,
  toolkits:     PLACEHOLDER,
  practices:    PLACEHOLDER,
  // About
  aboutInnerwise: PLACEHOLDER,
  ourStory:       PLACEHOLDER,
  ourFramework:   PLACEHOLDER,
  ourApproach:    PLACEHOLDER,
  ourExperts:     PLACEHOLDER,
  careers:        PLACEHOLDER,
  partnerships:   PLACEHOLDER,
  // Help
  gettingStarted:     PLACEHOLDER,
  faqs:               PLACEHOLDER,
  accountMembership:  PLACEHOLDER,
  appSupport:         PLACEHOLDER,
  contactUs:          PLACEHOLDER,
} as const;
