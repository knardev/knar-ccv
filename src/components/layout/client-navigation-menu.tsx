"use client";

import React from "react";
// components
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { LoggedInDropdown } from "@/components/layout/logged-in-dropdown";
import { ModeToggle } from "@/components/ui-custom/mode-toggle";
import { ActiveNavigationMenuLink } from "./active-navigation-menu-link";
// types
import { User } from "@supabase/supabase-js";

interface ClientNavigationMenuProps {
  user: User | null;
}

export function ClientNavigationMenu({ user }: ClientNavigationMenuProps) {
  return (
    <div className="w-full h-full flex items-center justify-between px-4">
      <div className="flex items-center space-x-4">
        <Link href="/">크날 CCV</Link>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <ActiveNavigationMenuLink href="/explore/homepage/design">
                홈페이지
              </ActiveNavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <ActiveNavigationMenuLink href="/explore/section/design">
                섹션
              </ActiveNavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-4">
          <ModeToggle />
          {user ? (
            <LoggedInDropdown />
          ) : (
            <Link href="/login" passHref>
              <Button>로그인</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
