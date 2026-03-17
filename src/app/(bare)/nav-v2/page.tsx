import NavHeader from "./NavHeader";
import DashboardWidgets from "../start-v2/_components/DashboardWidgets";
import AlertsTasksPanel from "../start-v2/_components/AlertsTasksPanel";
import QuickActions from "../start-v2/_components/QuickActions";
import RecentActivity from "../start-v2/_components/RecentActivity";
import PromoBanner from "../start-v2/_components/PromoBanner";
import QuickLinks from "../start-v2/_components/QuickLinks";

export default function NavV2Page() {
  return (
    <div className="min-h-screen bg-[#f4f4f4]">
      <NavHeader />

      <main className="mx-auto max-w-[1280px] space-y-10 px-6 py-10">
        <DashboardWidgets />
        <AlertsTasksPanel />
        <QuickActions />
        <RecentActivity />
        <PromoBanner />
        <QuickLinks />
      </main>
    </div>
  );
}
