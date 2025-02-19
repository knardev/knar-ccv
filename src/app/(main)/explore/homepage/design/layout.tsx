import { cookies } from "next/headers";
import Link from "next/link";
import { ImagePlus, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppFloatingSidebar } from "@/features/explore/components/homepage/app-floating-sidebar";
import { checkAccountRole } from "@/utils/auth/check-account-role";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";
  const accountRole = await checkAccountRole();

  return (
    <SidebarProvider className="min-h-full" defaultOpen={defaultOpen}>
      <div className="relative flex flex-col h-full">
        <AppFloatingSidebar />
      </div>
      <div className="w-full flex-1 relative overflow-hidden">
        <header className="absolute top-0 inset-x-0 h-16 z-50 bg-background px-4">
          <div className="w-full flex justify-between items-center h-full">
            <div className="flex h-16 items-center">
              <SidebarTrigger className="inline-flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-muted transition">
                <Menu className="w-4 h-4" />
                <span className="text-sm">토글</span>
              </SidebarTrigger>
            </div>

            <div>
              {accountRole === "ADMIN" && (
                <Link href={`/homepages/add`}>
                  <Button variant="default" className="text-lg">
                    <ImagePlus />
                    추가
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </header>

        {/* Additional Content - Scrollable */}
        <div className="w-full h-full overflow-y-auto pt-16 pb-4 px-4">
          {children}
        </div>
      </div>
    </SidebarProvider>
  );
}
