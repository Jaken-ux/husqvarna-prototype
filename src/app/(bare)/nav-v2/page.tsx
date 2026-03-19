import NavHeader from "./NavHeader";
import DashboardWidgets from "../start-v2/_components/DashboardWidgets";
import AlertsTasksPanel from "../start-v2/_components/AlertsTasksPanel";
import QuickActions from "../start-v2/_components/QuickActions";
import RecentActivity from "../start-v2/_components/RecentActivity";
import PromoBanner from "../start-v2/_components/PromoBanner";
import QuickLinks from "../start-v2/_components/QuickLinks";

export default function NavV2Page() {
  return (
    <div className="min-h-screen bg-white">
      <NavHeader />

      <main className="mx-auto max-w-[1280px] space-y-6 sm:space-y-10 px-4 sm:px-6 py-6 sm:py-10">
        <DashboardWidgets />
        <AlertsTasksPanel />
        {/* Campaign + Quick Actions side by side */}
        <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-[1fr_1fr]">
          <PromoBanner />
          <QuickActions />
        </div>
        <RecentActivity />
        <QuickLinks />
      </main>
    </div>
  );
}
