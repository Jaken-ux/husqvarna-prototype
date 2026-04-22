import { redirect } from "next/navigation";

// Min verksamhet landing page removed — Dealer Workspace is now the entry point.
// Previous landing page content (puffs, order indicators, section cards) is preserved
// in git history for future integration into Workspace tabs.
export default function MinVerksamhetPage() {
  redirect("/nav-v2/min-verksamhet/workspace");
}
