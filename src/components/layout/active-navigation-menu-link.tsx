"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

interface ActiveNavigationMenuLinkProps {
  href: string;
  children: React.ReactNode;
}

export function ActiveNavigationMenuLink({
  href,
  children,
}: ActiveNavigationMenuLinkProps) {
  const pathname = usePathname() || "";
  const isActive =
    (href.includes("/homepage") && pathname.includes("/homepage")) ||
    (href.includes("/section") && pathname.includes("/section"));

  return (
    <Link href={href} legacyBehavior passHref>
      <NavigationMenuLink
        className={`${navigationMenuTriggerStyle()} ${
          isActive ? "underline underline-offset-4" : ""
        }`}
      >
        {children}
      </NavigationMenuLink>
    </Link>
  );
}
