// top navigation menu with shadcn

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "../ui/button";
import { LoggedInDropdown } from "@/components/layout/logged-in-dropdown";

import { createClient } from "@/utils/supabase/server";

export async function TopNavigationMenu() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="h-16 w-full flex items-center bg-background fixed top-0 z-50">
      <div className="w-full h-full flex items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <Link href="/">크날 CCV</Link>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/explore/homepage/design" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    홈페이지 검색
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              {/* <NavigationMenuItem>
              <Link href="/explore/section/design" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  섹션
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem> */}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex items-center gap-10">
          {/* <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/guides" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  가이드
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/blogs" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  블로그
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu> */}
          {user ? (
            <LoggedInDropdown />
          ) : (
            <Link href="/login" passHref>
              <Button>로그인</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
