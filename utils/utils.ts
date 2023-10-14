export function bytesToMb(bytes: number): number {
  const MB = 1048576;
  return bytes / MB;
}

export function generateRandomNum() {
  return (Math.random() * (9999999999 - 100) + 100).toFixed();
}