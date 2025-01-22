"use server";

// actions
import { addHomepage } from "@/features/homepage/actions/add-homepage";
import { addPages } from "@/features/homepage/actions/add-pages";
import { addSections } from "@/features/homepage/actions/add-sections";
// utils
import { revalidatePath } from "next/cache";
// types
import {
  HomepageInsert,
  PageWithSections,
  SectionInsert,
} from "@/features/homepage/types/types";

/**
 * 새로운 홈페이지와 그에 속한 페이지 및 섹션을 생성하는 서버 액션
 * @param homepageData - 생성할 홈페이지 정보
 * @param pagesData - 생성할 페이지 및 섹션 정보
 * @returns 생성된 홈페이지 정보 (필요시 반환 구조 수정)
 */
export async function addNewHomepage(
  homepageData: HomepageInsert,
  pagesData: PageWithSections[],
) {
  try {
    // 1) 홈페이지 저장
    const newHomepage = await addHomepage(homepageData);
    if (!newHomepage) {
      throw new Error("홈페이지 생성에 실패했습니다.");
    }

    // 2) 페이지 순회하며 생성
    for (const page of pagesData) {
      const { sections, ...pageData } = page;

      // homepage_id를 주입해 새로 생성
      const { created_at, id, ...pageDataToInsert } = pageData;
      const pageToInsert = {
        ...pageDataToInsert,
        homepage_id: newHomepage.id,
      };
      // addPages는 배열을 받으므로, 단일 페이지도 배열에 담아 전달
      const [createdPage] = await addPages([pageToInsert]);

      // 3) 각 페이지에 대응하는 섹션들 생성(병렬 처리)
      if (sections && sections.length > 0) {
        // 각각의 섹션에 homepage_id, page_id를 주입
        const sectionsToInsert: SectionInsert[] = sections.map((section) => {
          const { id, created_at, ...rest } = section; // id와 created_at만 제외
          return {
            ...rest,
            homepage_id: newHomepage.id,
            page_id: createdPage.id,
          };
        });
        // 섹션 배열을 병렬로 생성
        await addSections(sectionsToInsert);
      }
    }

    // revalidate 로직(필요한 경로에 맞춰 조정)
    revalidatePath("/explore/homepage/design", "layout");
    revalidatePath(`/homepages/[homepage_id]`, "layout");

    // 생성된 Homepage 정보를 반환하거나,
    // 필요하다면 여기서 다른 후속 처리(예: 로그, 알림) 수행
    return newHomepage;
  } catch (error) {
    console.error("Error in addNewHomepage:", error);
    throw new Error("새로운 홈페이지를 생성하는 도중 에러가 발생했습니다.");
  }
}
