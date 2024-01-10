export const renameFile = (originalFile: File, newName: string) => new File([originalFile], `${newName}.jpg`, {
  type: 'image/jpg',
  lastModified: originalFile.lastModified,
});