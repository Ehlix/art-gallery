import {SelectedFileType} from "@/components/newProject/projectMain";

export function bytesToMb(bytes: number): number {
  const MB = 1048576;
  return bytes / MB;
}

export function renameFile(originalFile: File, newName: string) {
  return new File([originalFile], newName, {
    type: 'image/jpg',
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

export function cutNameFromSite(site:string): string {
  const index = site.lastIndexOf('/')
  const name = site.slice(index+1)
  return name || ''
}