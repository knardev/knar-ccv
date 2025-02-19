import { cookies } from "next/headers";
import { Menu } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppFloatingSidebarSections } from "@/features/explore/components/section/app-floating-sidebar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";

  return (
    <SidebarProvider className="min-h-full flex-1" defaultOpen={defaultOpen}>
      <div className="relative flex flex-col h-full">
        <AppFloatingSidebarSections />
      </div>
      <div className="w-full h-full flex-1 relative overflow-hidden flex flex-col">
        <header className="sticky top-0 h-16 flex-shrink-0 z-50 bg-background px-4">
          <div className="w-full flex justify-between items-center h-full">
            <div className="flex h-16 items-center">
              <SidebarTrigger className="inline-flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-muted transition">
                <Menu className="w-4 h-4" />
                <span className="text-sm">토글</span>
              </SidebarTrigger>
            </div>
          </div>
        </header>
        {/* 스크롤 영역: flex-1과 min-h-0을 적용하여 남은 공간을 정확히 차지 */}
        <div className="w-full flex-1 overflow-y-auto pb-4 px-4 flex flex-col min-h-0">
          {children}
        </div>
      </div>
    </SidebarProvider>
  );
}
