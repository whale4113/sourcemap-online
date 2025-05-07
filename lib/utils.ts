import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 辅助函数：提取纯文件名（去除路径和扩展名）
export const getPureFileName = (filePath: string): string => {
  // 获取文件名（去除路径）
  const fileName = filePath.split("/").pop() || filePath;
  // 去除扩展名，保留完整的文件名（包括哈希值）
  return fileName.replace(/\.[^/.]+$/, "");
};
