import {SelectedFileType} from "@/components/newProject/projectMain";

export function bytesToMb(bytes: number): number {
  const MB = 1048576;
  return bytes / MB;
}

export function renameFile(originalFile: File, newName: string) {
  return new File([originalFile], newName, {
    type: originalFile.type,
    lastModified: originalFile.lastModified,
  });
}

export function sortSelectedFiles(a: SelectedFileType, b: SelectedFileType) {
  if (a.order > b.order) {
    return 1;
  } else {
    return -1;
  }
}