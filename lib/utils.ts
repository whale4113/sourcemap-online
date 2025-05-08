import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { UnwrapPromise } from "./type-utils";

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

export const readFileAsText = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      if (event.target?.result) {
        resolve(event.target.result as string);
      }
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsText(file);
  });

export enum State {
  Idle,
  Busy,
}

type Inner = (...args: any[]) => Promise<any> | any;

export const withStateLock = <T extends Inner>(
  stateRef: React.RefObject<State>,
  inner: T
): ((
  ...args: Parameters<T>
) => Promise<UnwrapPromise<ReturnType<T>> | void>) => {
  return async (...args) => {
    if (stateRef.current === State.Busy) {
      return;
    }

    stateRef.current = State.Busy;

    const result = (await Promise.resolve(inner(...args))) as UnwrapPromise<
      ReturnType<T>
    >;

    stateRef.current = State.Idle;

    return result;
  };
};
