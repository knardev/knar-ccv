// revalidate.ts
"use server";

import { revalidatePath } from "next/cache";

/**
 * 서버 액션을 사용하여 경로 재검증
 * @param path - 재검증할 경로
 * @param target - 재검증할 대상
 */
export async function revalidate(path: string, target: 
  "page" | "layout"
): Promise<void> {
  console.log(`Revalidating path: ${path}`);
  revalidatePath(path, target);
}
