// [homepage_id] is a dynamic route

export default function Page({ homepage_id }: { homepage_id: string }) {
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-between">
      홈페이지 레퍼런스의 디테일 페이지입니다. ({homepage_id})
    </main>
  );
}
