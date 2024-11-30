// revalidate.ts
"use server";

import { revalidatePath } from "next/cache";

/**
 * 서버 액션을 사용하여 경로 재검증
 * @param path - 재검증할 경로
 */
export async function revalidate(path: string): Promise<void> {
  revalidatePath(path);
}
