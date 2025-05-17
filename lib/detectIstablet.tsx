export function detectIsTablet(userAgent: string): boolean {
  return /iPad|Android|Tablet/i.test(userAgent); // Simple check for tablets
}
