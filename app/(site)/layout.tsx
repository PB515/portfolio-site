import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SideDecor } from "@/components/SideDecor";

// Layout for all PUBLIC pages (route group "(site)" — does not affect URLs).
// /admin is outside this group and keeps its own minimal chrome.
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SideDecor />
      <SiteHeader />
      <div className="flex-1">{children}</div>
      <SiteFooter />
    </>
  );
}
