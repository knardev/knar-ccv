import { redirect } from "next/navigation";

export default function Page() {
  redirect("explore/homepage/design");
  return (
    <main className="w-full flex flex-col items-center justify-between">
      메인화면입니다.
    </main>
  );
}
