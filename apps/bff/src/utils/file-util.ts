export const getFileExtension = (fileName: string): string | null => {
  const parts = fileName.split('.');
  return parts.length > 1 ? parts.pop() || null : null;
};
