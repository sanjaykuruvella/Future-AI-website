import { createBrowserRouter } from "react-router";

// Landing Page
import LandingPage from "./screens/LandingPage";

// Demo Navigation
import DemoNavigationScreen from "./screens/DemoNavigationScreen";

// Web Auth & Onboarding
import SplashScreenWeb from "./screens/auth/SplashScreenWeb";
import WelcomeScreenWeb from "./screens/auth/WelcomeScreenWeb";
import LoginScreenWeb from "./screens/auth/LoginScreenWeb";
import SignUpScreenWeb from "./screens/auth/SignUpScreenWeb";
import ForgotPasswordScreenWeb from "./screens/auth/ForgotPasswordScreenWeb";

// Web onboarding
import FeatureIntro1ScreenWeb from "./screens/onboarding/FeatureIntro1ScreenWeb";
import FeatureIntro2ScreenWeb from "./screens/onboarding/FeatureIntro2ScreenWeb";
import FeatureIntro3ScreenWeb from "./screens/onboarding/FeatureIntro3ScreenWeb";

// Web Home & Dashboard
import HomeDashboardWeb from "./screens/home/HomeDashboardWeb";
import QuickSimulationHubWeb from "./screens/home/QuickSimulationHubWeb";
import AIAssistantChatScreenWeb from "./screens/home/AIAssistantChatScreenWeb";

// No mobile fallbacks needed - all converted to web

// Web Settings & Profile
import SettingsScreenWeb from "./screens/settings/SettingsScreenWeb";
import ProfileScreenWeb from "./screens/profile/ProfileScreenWeb";
import PrivacyPolicyScreenWeb from "./screens/settings/PrivacyPolicyScreenWeb";
import PrivacySecurityScreenWeb from "./screens/settings/PrivacySecurityScreenWeb";
import DisplaySettingsScreenWeb from "./screens/settings/DisplaySettingsScreenWeb";
import LanguageRegionScreenWeb from "./screens/settings/LanguageRegionScreenWeb";
import AIPreferencesScreenWeb from "./screens/settings/AIPreferencesScreenWeb";
import HelpSupportScreenWeb from "./screens/settings/HelpSupportScreenWeb";
import SendFeedbackScreenWeb from "./screens/settings/SendFeedbackScreenWeb";

// No mobile fallbacks for settings - all in web version

// Web Simulation Engine
import SimulationIntroScreenWeb from "./screens/simulation/SimulationIntroScreenWeb";
import DecisionCategoryScreenWeb from "./screens/simulation/DecisionCategoryScreenWeb";
import CareerDecisionScreenWeb from "./screens/simulation/CareerDecisionScreenWeb";
import DecisionSimulationScreenWeb from "./screens/simulation/DecisionSimulationScreenWeb";

// Web simulation screens
import FinanceDecisionScreenWeb from "./screens/simulation/FinanceDecisionScreenWeb";
import EducationDecisionScreenWeb from "./screens/simulation/EducationDecisionScreenWeb";
import AIProcessingScreenWeb from "./screens/simulation/AIProcessingScreenWeb";

import AnalyticsDashboardWeb from "./screens/analysis/AnalyticsDashboardWeb";
import TrendAnalysisScreenWeb from "./screens/analysis/TrendAnalysisScreenWeb";
import GrowthMetricsScreenWeb from "./screens/analysis/GrowthMetricsScreenWeb";
import AlternateScenarioScreenWeb from "./screens/analysis/AlternateScenarioScreenWeb";
import CompareFuturesScreenWeb from "./screens/analysis/CompareFuturesScreenWeb";
import HistoryTimelineScreenWeb from "./screens/analysis/HistoryTimelineScreenWeb";
import GoalsScreenWeb from "./screens/analysis/GoalsScreenWeb";

// Web Simulation Components
import PredictionSummaryScreenWeb from "./screens/simulation/PredictionSummaryScreenWeb";
import ScenarioMapScreenWeb from "./screens/simulation/ScenarioMapScreenWeb";
import TimelineProjectionScreenWeb from "./screens/simulation/TimelineProjectionScreenWeb";
import RiskVsRewardScreenWeb from "./screens/simulation/RiskVsRewardScreenWeb";

// Home Components
import OpportunityHighlightsScreenWeb from "./screens/home/OpportunityHighlightsScreenWeb";
import RiskAlertsScreenWeb from "./screens/home/RiskAlertsScreenWeb";

// All analysis and profile screens now in web format

export const router = createBrowserRouter([
  // Demo/Testing navigation
  { path: "/demo", element: <DemoNavigationScreen /> },

  // Landing & Marketing
  { path: "/", element: <LandingPage /> },

  // Web-optimized routes
  { path: "/splash", element: <SplashScreenWeb /> },
  { path: "/welcome", element: <WelcomeScreenWeb /> },
  { path: "/login", element: <LoginScreenWeb /> },
  { path: "/signup", element: <SignUpScreenWeb /> },
  { path: "/forgot-password", element: <ForgotPasswordScreenWeb /> },
  { path: "/home", element: <HomeDashboardWeb /> },
  { path: "/quick-simulation", element: <QuickSimulationHubWeb /> },
  { path: "/analytics", element: <AnalyticsDashboardWeb /> },
  { path: "/settings", element: <SettingsScreenWeb /> },
  { path: "/settings/privacy-policy", element: <PrivacyPolicyScreenWeb /> },
  { path: "/settings/privacy", element: <PrivacySecurityScreenWeb /> },
  { path: "/settings/display", element: <DisplaySettingsScreenWeb /> },
  { path: "/settings/language", element: <LanguageRegionScreenWeb /> },
  { path: "/settings/ai-preferences", element: <AIPreferencesScreenWeb /> },
  { path: "/settings/help", element: <HelpSupportScreenWeb /> },
  { path: "/settings/feedback", element: <SendFeedbackScreenWeb /> },
  { path: "/profile", element: <ProfileScreenWeb /> },
  { path: "/ai-chat", element: <AIAssistantChatScreenWeb /> },
  { path: "/simulation", element: <DecisionSimulationScreenWeb /> },
  { path: "/simulation-intro", element: <SimulationIntroScreenWeb /> },
  { path: "/simulation/category", element: <DecisionCategoryScreenWeb /> },
  { path: "/simulation/career", element: <CareerDecisionScreenWeb /> },
  { path: "/simulation/finance", element: <FinanceDecisionScreenWeb /> },
  { path: "/simulation/education", element: <EducationDecisionScreenWeb /> },
  { path: "/simulation/processing", element: <AIProcessingScreenWeb /> },

  // Onboarding flow (web)
  { path: "/feature-intro-1", element: <FeatureIntro1ScreenWeb /> },
  { path: "/feature-intro-2", element: <FeatureIntro2ScreenWeb /> },
  { path: "/feature-intro-3", element: <FeatureIntro3ScreenWeb /> },

  // Main app routes (all web-optimized)
  { path: "/analysis/trends", element: <TrendAnalysisScreenWeb /> },
  { path: "/analysis/growth", element: <GrowthMetricsScreenWeb /> },
  { path: "/analysis/history-timeline", element: <HistoryTimelineScreenWeb /> },
  { path: "/analysis/goals", element: <GoalsScreenWeb /> },
  { path: "/analysis/alternate", element: <AlternateScenarioScreenWeb /> },
  { path: "/analysis/compare", element: <CompareFuturesScreenWeb /> },
  { path: "/simulation/prediction-summary", element: <PredictionSummaryScreenWeb /> },
  { path: "/simulation/scenario-map", element: <ScenarioMapScreenWeb /> },
  { path: "/simulation/timeline", element: <TimelineProjectionScreenWeb /> },
  { path: "/simulation/risk-reward", element: <RiskVsRewardScreenWeb /> },
  { path: "/opportunity-highlights", element: <OpportunityHighlightsScreenWeb /> },
  { path: "/priority-alerts", element: <RiskAlertsScreenWeb /> },

  // Catch-all redirect for any undefined routes - redirects to analytics
  { path: "*", element: <AnalyticsDashboardWeb /> },
]);