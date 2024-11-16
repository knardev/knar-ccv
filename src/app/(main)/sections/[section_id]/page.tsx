// [homepage_id] is a dynamic route

export default function Page({ section_id }: { section_id: string }) {
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-between">
      섹션 레퍼런스의 디테일 페이지입니다. ({section_id})
    </main>
  );
}
