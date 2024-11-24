// top navigation menu with shadcn
"use client";
import Link from "next/link";
import { CreditCard, LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { signOut } from "@/app/(auth)/actions";

export function LoggedInDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>KR</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>내 계정</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* <DropdownMenuItem>
          <Link href="/account" legacyBehavior passHref>
            <div className="flex gap-2 items-center">
              <User className="h-4" />
              <span>프로필</span>
            </div>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/subscription" legacyBehavior passHref>
            <div className="flex gap-2 items-center">
              <CreditCard className="h-4" />
              <span>구독관리</span>
            </div>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="/privacy" legacyBehavior passHref>
            <div className="flex gap-2 items-center">
              <CreditCard className="h-4" />
              <span>개인정보처리방침</span>
            </div>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/terms" legacyBehavior passHref>
            <div className="flex gap-2 items-center">
              <CreditCard className="h-4" />
              <span>이용약관</span>
            </div>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator /> */}
        <div className="w-full h-2"></div>
        <Button
          variant="destructive"
          onClick={async () => {
            await signOut();
          }}
        >
          <LogOut /> <span>로그아웃</span>
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
