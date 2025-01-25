import { redirect } from "next/navigation";

export default function Page() {
  redirect("/explore/homepage/design");
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-between">
      메인페이지, 마케팅용 랜딩 페이지입니다. 로그인이 되어있으면 대시보드로
      이동합니다.
    </main>
  );
}
