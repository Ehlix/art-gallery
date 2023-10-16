export function bytesToMb(bytes: number): number {
  const MB = 1048576;
  return bytes / MB;
}

export function generateRandomNum() {
  return (Math.random() * (9999999999 - 100) + 100).toFixed();
}

export function renameFile(originalFile:File, newName:string) {
  return new File([originalFile], newName, {
    type: originalFile.type,
    lastModified: originalFile.lastModified,
  });
}