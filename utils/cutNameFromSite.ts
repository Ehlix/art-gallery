export const cutNameFromSite = (site: string): string => {
  const index = site.lastIndexOf('/');
  const name = site.slice(index + 1);
  return name || '';
};