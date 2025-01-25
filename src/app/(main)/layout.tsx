import { checkAccountRole } from "@/utils/auth/check-account-role";

export default async function Layout({
  children,
  drawer,
}: {
  children: React.ReactNode;
  drawer: React.ReactNode;
}) {
  const accountRole = await checkAccountRole();
  if (accountRole === "UNAUTHORIZED") {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">보기 권한이 없습니다.</h1>
          <p className="text-lg">관리자에게 요청해주세요.</p>
        </div>
      </div>
    );
  }
  // console.log("accountRole", accountRole);
  return (
    <>
      {children}
      {drawer}
    </>
  );
}
